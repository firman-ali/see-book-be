const axios = require('axios');
const FormData = require('form-data');
const AuthenticationError = require('../../exceptions/AuthenticationError');

class SalesHandler {
  constructor(service, tokenManager, validator) {
    this._service = service;
    this._tokenManager = tokenManager;
    this._validator = validator;

    this.getSalesHandler = this.getSalesHandler.bind(this);
    this.getSaleByIdHandler = this.getSaleByIdHandler.bind(this);
    this.postSaleByIdHandler = this.postSaleByIdHandler.bind(this);
    this.getPaymentMethod = this.getPaymentMethod.bind(this);
  }

  async getSalesHandler(request) {
    const { uid } = request.auth.credentials;
    const data = await this._service.getSales(uid);
    return {
      status: 'success',
      data,
    };
  }

  async getSaleByIdHandler(request) {
    const { id } = request.params;
    const data = await this._service.getSaleById(id);
    return {
      status: 'success',
      data,
    };
  }

  async postSaleByIdHandler(request) {
    const { uid, email } = request.auth.credentials;
    this._validator.validatePostSaleByIdPayload(request.payload);

    const sale = await this._service.addSale(uid, request.payload);

    const date = new Date();
    const now = `${date.getFullYear()}${date.getMonth()}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
    const data = new FormData();
    data.append('name', request.payload.customer_name);
    data.append('phone', request.payload.customer_phone_number);
    data.append('email', email);
    data.append('amount', request.payload.total.toString());
    data.append('referenceId', sale.id);
    data.append('notifyUrl', 'https://mywebsite.com');
    data.append('paymentMethod', request.payload.payment_method);
    data.append('paymentChannel', request.payload.payment_channel);

    const requestBody = {
      name: request.payload.customer_name,
      phone: request.payload.customer_phone_number,
      email,
      amount: request.payload.total.toString(),
      referenceId: sale.id,
      notifyUrl: 'https://mywebsite.com',
      paymentMethod: request.payload.payment_method,
      paymentChannel: request.payload.payment_channel,
    };
    const signature = this._tokenManager.generateSigantureToken(requestBody);
    const config = {
      method: 'post',
      url: 'https://sandbox.ipaymu.com/api/v2/payment/direct',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'application/json',
        signature,
        va: process.env.VA_NUMBER,
        timestamp: now,
        ...data.getHeaders(),
      },
      data,
    };
    const response = await axios(config);

    if (response.status === 401) {
      throw new AuthenticationError('Unauthorized');
    }

    await this._service.updateSaleById(sale.id, response.data.Data.TransactionId);

    const config_recomendation = {
      method: 'post',
      url: 'https://72ee-110-136-225-202.ngrok.io/v1/books/recomendation',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'application/json',
      },
      data: { book_id: request.payload.book },
    };

    const recomendation_books = await axios(config_recomendation);

    console.log(recomendation_books);

    return {
      status: 'success',
      data: response.data.Data,
      recomendation_books: recomendation_books.data,
    };
  }

  async getPaymentMethod() {
    const date = new Date();
    const now = `${date.getFullYear()}${date.getMonth()}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
    const signature = this._tokenManager.generateSigantureToken({});
    const config = {
      method: 'post',
      url: 'https://sandbox.ipaymu.com/api/v2/payment-method-list',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'application/json',
        signature,
        va: process.env.VA_NUMBER,
        timestamp: now,
      },
      data: {},
    };

    const response = await axios(config);

    if (response.status === 401) {
      throw new AuthenticationError('Unauthorized');
    }

    return {
      status: 'success',
      data: response.data.Data,
    };
  }
}

module.exports = SalesHandler;
