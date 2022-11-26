const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const InvariantError = require('../../exceptions/InvariantError');
const AuthenticationError = require('../../exceptions/AuthenticationError');

class AuthenticationsService {
  constructor() {
    this._pool = new Pool();
  }

  async addUser({
    email, password, username, phone,
  }) {
    await this.verifyNewUser(email);
    const uid = `U-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash(password, 10);
    const nowUtc = new Date().getTime();

    const query = {
      text: `INSERT INTO users (uid, email, password, name, phone_number, is_deleted, created_at) 
              VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING uid, email, name, phone_number, created_at`,
      values: [uid, email, hashedPassword, username, phone, false, nowUtc],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('User gagal ditambahkan');
    }

    return result.rows[0];
  }

  async verifyNewUser(email) {
    const query = {
      text: 'SELECT email FROM users WHERE email = $1',
      values: [email],
    };

    const result = await this._pool.query(query);

    if (result.rowCount) {
      throw new InvariantError('Gagal menambahkan user. email sudah digunakan.');
    }
  }

  async verifyUserCredential(email, password) {
    const query = {
      text: 'SELECT uid, name, password, profile_pic FROM users WHERE email = $1',
      values: [email],
    };
    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new AuthenticationError('User tidak ditemukan');
    }

    const {
      uid, name, password: hashedPassword, profile_pic,
    } = result.rows[0];

    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
      throw new AuthenticationError('Password anda salah');
    }

    return {
      uid, profile_pic, name,
    };
  }

  async addSeller({
    email, password, username, phone, address,
  }) {
    await this.verifyNewSeller(email);
    const uid = `S-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash(password, 10);
    const nowUtc = new Date().getTime();
    const query = {
      text: `INSERT INTO sellers (uid, email, password, name, phone_number, address, is_deleted, created_at) 
              VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING uid, email, name, phone_number, address, created_at`,
      values: [uid, email, hashedPassword, username, phone, address, false, nowUtc],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new InvariantError('User gagal ditambahkan');
    }
    return result.rows[0];
  }

  async verifyNewSeller(email) {
    const query = {
      text: 'SELECT email FROM sellers WHERE email = $1',
      values: [email],
    };
    const result = await this._pool.query(query);
    if (result.rowCount) {
      throw new InvariantError('Gagal menambahkan user. email sudah digunakan.');
    }
  }

  async verifySellerCredential(email, password) {
    const query = {
      text: 'SELECT uid, name, password, profile_pic, address FROM sellers WHERE email = $1',
      values: [email],
    };
    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new AuthenticationError('User tidak ditemukan');
    }

    const {
      uid, name, password: hashedPassword, profile_pic,
    } = result.rows[0];
    const match = await bcrypt.compare(password, hashedPassword);
    if (!match) {
      throw new AuthenticationError('Password anda salah');
    }
    return {
      uid, profile_pic, name,
    };
  }

  async addAdmin({
    email, password, username, phone,
  }) {
    await this.verifyNewAdmin(email);
    const uid = `ADM-${nanoid(5)}`;
    const hashedPassword = await bcrypt.hash(password, 10);
    const nowUtc = new Date().getTime();
    const query = {
      text: `INSERT INTO admins (uid, email, password, name, phone_number, is_deleted, created_at) 
              VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING uid, email, name, phone_number, created_at`,
      values: [uid, email, hashedPassword, username, phone, false, nowUtc],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new InvariantError('User gagal ditambahkan');
    }
    return result.rows[0];
  }

  async verifyNewAdmin(email) {
    const query = {
      text: 'SELECT email FROM admins WHERE email = $1',
      values: [email],
    };
    const result = await this._pool.query(query);
    if (result.rowCount) {
      throw new InvariantError('Gagal menambahkan user. email sudah digunakan.');
    }
  }

  async verifyAdminCredential(email, password) {
    const query = {
      text: 'SELECT uid, name, password, profile_pic FROM admins WHERE email = $1',
      values: [email],
    };
    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new AuthenticationError('User tidak ditemukan');
    }

    const {
      uid, name, password: hashedPassword, profile_pic,
    } = result.rows[0];
    const match = await bcrypt.compare(password, hashedPassword);
    if (!match) {
      throw new AuthenticationError('Password anda salah');
    }
    return {
      uid, profile_pic, name,
    };
  }

  async addRefreshToken(token) {
    const nowUtc = new Date().getTime();
    const query = {
      text: 'INSERT INTO authentications VALUES($1, $2)',
      values: [token, nowUtc],
    };
    await this._pool.query(query);
  }

  async verifyRefreshToken(token) {
    const query = {
      text: 'SELECT token FROM authentications WHERE token = $1',
      values: [token],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new InvariantError('Refresh token tidak valid');
    }
  }

  async deleteRefreshToken(token) {
    const query = {
      text: 'DELETE FROM authentications WHERE token = $1',
      values: [token],
    };
    await this._pool.query(query);
  }
}

module.exports = AuthenticationsService;
