const { Pool } = require('pg');
const NotFoundError = require('../../exceptions/NotFoundError');
const InvariantError = require('../../exceptions/InvariantError');

class PricesService {
  constructor() {
    this._pool = new Pool();
  }

  async addPrices(bookId, list_price) {
    const nowUtc = new Date().getTime();
    const query = {
      text: 'INSERT INTO prices(book, list_price, created_at) VALUES($1, $2, $3)',
      values: [bookId, list_price, nowUtc],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new InvariantError('Data gagal ditambahkan');
    }
    return result.rows[0];
  }

  async getPricesById(bookId) {
    const query = {
      text: 'SELECT id, book, list_price FROM prices WHERE book = $1',
      values: [bookId],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError('Data tidak ditemukan');
    }
    return result.rows[0];
  }

  async editPricesById(bookId, list_price) {
    const nowUtc = new Date().getTime();
    const query = {
      text: 'UPDATE prices SET list_price = $2, updated_at = $3 WHERE book = $1 RETURNING id',
      values: [bookId, list_price, nowUtc],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new InvariantError('Data gagal diperbaharui');
    }
    return result.rows[0];
  }
}

module.exports = PricesService;
