exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('books', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
      notNull: true,
    },
    genres: {
      type: 'jsonb[]',
      notNull: true,
    },
    name: {
      type: 'TEXT',
      notNull: true,
    },
    synopsis: {
      type: 'TEXT',
      notNull: true,
    },
    writer: {
      type: 'TEXT',
      notNull: true,
    },
    publisher_id: {
      type: 'VARCHAR(50)',
      notNull: false,
      references: 'users',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    publisher: {
      type: 'TEXT',
      notNull: true,
    },
    language: {
      type: 'TEXT',
      notNull: false,
    },
    total_page: {
      type: 'INT',
      notNull: true,
    },
    is_deleted: {
      type: 'BOOLEAN',
      notNull: false,
    },
    created_at: {
      type: 'BIGINT',
      notNull: true,
    },
    updated_at: {
      type: 'BIGINT',
      notNull: false,
    },
    book_cover: {
      type: 'TEXT',
      notNull: false,
    },
  });
};

exports.down = pgm => {
  pgm.dropTable('books');
};
