const { Pool } = require('pg');
const NotFoundError = require('../../exceptions/NotFoundError');
const InvariantError = require('../../exceptions/InvariantError');

class GenresService {
  constructor() {
    this._pool = new Pool();
  }

  async getGenres() {
    const query = {
      text: 'SELECT id, name FROM genres',
    };
    const result = await this._pool.query(query);
    return result.rows;
  }

  async addGenres(name, description, uid) {
    const nowUtc = new Date().getTime();
    const query = {
      text: 'INSERT INTO genres(name, description, created_by, created_at) VALUES($1, $2, $3, $4)',
      values: [name, description, uid, nowUtc],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new InvariantError('Data gagal ditambahkan');
    }
    return result.rows[0];
  }

  async getGenresById(id) {
    const query = {
      text: 'SELECT id, name, description FROM genres WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError('Data tidak ditemukan');
    }
    return result.rows[0];
  }

  async editGenresById(id, name, description) {
    const nowUtc = new Date().getTime();
    const query = {
      text: 'UPDATE genres SET name = $1, description = $2, updated_at = $3 WHERE id = $4 RETURNING id',
      values: [name, description, nowUtc, id],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new InvariantError('Data gagal diperbaharui');
    }
    return result.rows[0];
  }

  async deleteGenresById(id) {
    const query = {
      text: 'DELETE FROM genres WHERE id = $1 RETURNING id',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new InvariantError('Data gagal dihapus');
    }
    return result.rows[0];
  }
}

module.exports = GenresService;
