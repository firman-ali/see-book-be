const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const fs = require('fs');
const NotFoundError = require('../../exceptions/NotFoundError');
const InvariantError = require('../../exceptions/InvariantError');
require('dotenv').config();

class SalesService {
  constructor() {
    this._pool = new Pool({
      user: process.env.PGUSER,
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      port: process.env.PGPORT,
      ssl: {
        rejectUnauthorized: process.env.PGREJECTUNAUTHORIZED,
        ca: fs.readFileSync('ca-certificate.crt').toString(),
      },
    });
    // this._pool = new Pool();
  }

  async addSale(uid, {
    book, price_type, duration, sub_total, voucher, total, payment_method, payment_channel,
  }) {
    try {
      const id = `TRX${nanoid(16)}`;
      const nowUtc = new Date().getTime();
      const query = {
        text: 'INSERT INTO sales VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id',
        values: [
          id, uid, book, price_type, duration, sub_total, voucher,
          total, payment_method, payment_channel, 0, nowUtc,
        ],
      };
      const result = await this._pool.query(query);
      if (!result.rowCount) {
        throw new InvariantError('Transaksi gagal ditambahkan');
      }
      return result.rows[0];
    } catch (error) {
      throw new InvariantError('Transaksi gagal ditambahkan');
    }
  }

  async getSales(userId) {
    const query = {
      text: 'SELECT id, trx_id, price_type, duration, total, status FROM sales WHERE "user" IN ($1)',
      values: [userId],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }

  async getSaleById(saleId) {
    const query = {
      text: `SELECT id, trx_id, book, price_type, duration, sub_total, voucher, total, payment_method, status, created_at
              FROM sales WHERE id = $1`,
      values: [saleId],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError('Data transaksi tidak ditemukan');
    }
    return result.rows[0];
  }

  async updateSaleById(saleId, trxId) {
    const query = {
      text: 'UPDATE sales SET trx_id = $2 WHERE id = $1',
      values: [saleId, trxId],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError('Data transaksi tidak ditemukan');
    }
    return result.rows[0];
  }
}

module.exports = SalesService;
