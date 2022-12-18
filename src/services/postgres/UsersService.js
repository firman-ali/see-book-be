const { Pool } = require('pg');
const fs = require('fs');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthorizationError = require('../../exceptions/AuthorizationError');
const AuthenticationError = require('../../exceptions/AuthenticationError');
const InvariantError = require('../../exceptions/InvariantError');
require('dotenv').config();

class UsersService {
  constructor() {
    this._pool = new Pool({
      user: process.env.PGUSER,
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      port: process.env.PGPORT,
      rejectUnauthorized: process.env.PGREJECTUNAUTHORIZED,
      ssl: {
        cert: fs.readFileSync(`${__dirname}/ca-certificate.crt`),
      },
    });
  }

  async addUser(uid, email, { name, phone_number, role }) {
    const nowUtc = new Date().getTime();

    const query = {
      text: `INSERT INTO users (uid, email, name, role, phone_number, is_deleted, created_at) 
              VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING uid, email, name, phone_number, profile_pic, created_at`,
      values: [uid, email, name, role, phone_number, false, nowUtc],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('User gagal ditambahkan');
    }

    return result.rows[0];
  }

  async getUserById(userId) {
    const query = {
      text: `SELECT uid, role, email, profile_pic, name, phone_number, created_at, updated_at
              FROM users WHERE uid = $1`,
      values: [userId],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError('User tidak ditemukan');
    }
    return result.rows[0];
  }

  async updateUserById(userId, { name, phone_number }) {
    const nowUtc = new Date().getTime();

    const query = {
      text: 'UPDATE users SET name = $2, phone_number = $3, updated_at = $4 WHERE uid = $1 RETURNING uid',
      values: [userId, name, phone_number, nowUtc],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('User gagal diperbaharui');
    }
  }

  async deleteUserById(userId) {
    const nowUtc = new Date().getTime();

    const query = {
      text: 'UPDATE users SET is_deleted = true, updated_at = $2 WHERE uid = $1 RETURNING uid',
      values: [userId, nowUtc],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('User gagal diperbaharui');
    }
  }

  async statusDeletedUser(userId) {
    const query = {
      text: 'SELECT uid FROM users WHERE uid = $1 AND is_deleted = true',
      values: [userId],
    };
    const result = await this._pool.query(query);
    if (result.rowCount) {
      throw new AuthorizationError('User tidak ditemukan');
    }
  }

  async verifyAccessNotUser(userId) {
    const query = {
      text: 'SELECT uid FROM users WHERE uid = $1 AND role != 0',
      values: [userId],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new AuthenticationError('User tidak memiliki akses');
    }
  }

  async verifySeller(userId) {
    const query = {
      text: 'SELECT uid FROM users WHERE uid = $1 AND role = 1',
      values: [userId],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new AuthenticationError('User tidak memiliki akses');
    }
  }

  async verifyAdmin(userId) {
    const query = {
      text: 'SELECT uid FROM users WHERE uid = $1 AND role = 2',
      values: [userId],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new AuthenticationError('User tidak memiliki akses');
    }
  }
}

module.exports = UsersService;
