const { Pool } = require('pg');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthorizationError = require('../../exceptions/AuthorizationError');

class UsersService {
  constructor() {
    this._pool = new Pool();
  }

  async getUserById(userId) {
    const query = {
      text: `SELECT uid, profile_pic, name, email, phone_number, is_deleted, created_at, updated_at 
              FROM users WHERE uid = $1`,
      values: [userId],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError('User tidak ditemukan');
    }
    return result.rows[0];
  }

  async getSellerById(userId) {
    const query = {
      text: `SELECT uid, profile_pic, name, email, phone_number, address, is_deleted, created_at, updated_at 
              FROM sellers WHERE uid = $1`,
      values: [userId],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError('User tidak ditemukan');
    }
    return result.rows[0];
  }

  async getAdminById(userId) {
    const query = {
      text: 'SELECT * FROM admins WHERE uid = $1',
      values: [userId],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError('User tidak ditemukan');
    }
    return result.rows[0];
  }

  async verifyUser(userId) {
    const query = {
      text: 'SELECT uid FROM users WHERE uid = $1',
      values: [userId],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new AuthorizationError('User tidak memiliki akses');
    }
  }

  async verifySeller(userId) {
    const query = {
      text: 'SELECT uid FROM sellers WHERE uid = $1',
      values: [userId],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new AuthorizationError('User tidak memiliki akses');
    }
  }

  async verifyAdmin(userId) {
    const query = {
      text: 'SELECT uid FROM admins WHERE uid = $1',
      values: [userId],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new AuthorizationError('User tidak memiliki akses');
    }
  }
}

module.exports = UsersService;
