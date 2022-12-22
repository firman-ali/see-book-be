/* eslint-disable max-len */
const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const fs = require('fs');
const NotFoundError = require('../../exceptions/NotFoundError');
const InvariantError = require('../../exceptions/InvariantError');
require('dotenv').config();

class BooksService {
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

  async getBooks() {
    const query = {
      text: `SELECT books.id, books.name, books.writer, books.thumbnail, book_ratings.rating, book_ratings.total_review,  prices.list_price[1] as price_max, prices.list_price[2] as price_min
              FROM books
              INNER JOIN book_ratings ON book_ratings.book = books.id
              INNER JOIN prices ON prices.book = books.id
              WHERE books.is_deleted = false`,
    };
    const result = await this._pool.query(query);
    return result.rows;
  }

  async addBooks(name, synopsis, writer, language, publisher_id, publisher, total_page, genres) {
    const id = `B-${nanoid(16)}`;
    const nowUtc = new Date().getTime();
    const query = {
      text: `INSERT INTO books(id, name, synopsis, writer, publisher_id, publisher, language, total_page, genres, is_deleted, created_at) 
              VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id`,
      values: [id, name, synopsis, writer, publisher_id, publisher, language, total_page, genres, false, nowUtc],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new InvariantError('Data gagal ditambahkan');
    }
    return result.rows[0];
  }

  async getBooksById(id) {
    const query = {
      text: `SELECT books.id, books.name, books.synopsis, books.writer, books.publisher_id, books.publisher, books.language, books.total_page, books.created_at, books.thumbnail, book_ratings.rating, book_ratings.total_review, books.genres,  prices.list_price[1] as price_max, prices.list_price[2] as price_min
              FROM books
              INNER JOIN book_ratings ON book_ratings.book = books.id
              INNER JOIN prices ON prices.book = books.id
              WHERE books.id = $1`,
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError('Data tidak ditemukan');
    }
    return result.rows[0];
  }

  async editBooksById(id, name, synopsis, writer, publisher_id, publisher, language, totalPage, genres) {
    const nowUtc = new Date().getTime();
    const query = {
      text: 'UPDATE books SET name = $1, synopsis = $2, writer = $3, publisher_id = $4 publisher = $5, language = $6, total_page = $7, genres=$8 updated_at = $9 WHERE id = $10 RETURNING id',
      values: [name, synopsis, writer, publisher_id, publisher, language, totalPage, genres, nowUtc, id],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new InvariantError('Data gagal diperbaharui');
    }
    return result.rows[0];
  }

  async deleteBooksById(id) {
    const nowUtc = new Date().getTime();
    const query = {
      text: 'UPDATE books is_deleted = $1, updated_at = $2 SET WHERE id = $3 RETURNING id',
      values: [true, nowUtc, id],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new InvariantError('Data gagal dihapus');
    }
    return result.rows[0];
  }
}

module.exports = BooksService;
