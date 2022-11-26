exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('reviews', {
    id: {
      type: 'BIGSERIAL',
      primaryKey: true,
      notNull: true,
    },
    book: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: 'books',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    reviewer: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: 'users',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    review: {
      type: 'TEXT',
      notNull: true,
    },
    rating: {
      type: 'Float',
      notNull: true,
    },
    created_at: {
      type: 'BIGINT',
      notNull: true,
    },
    updated_at: {
      type: 'BIGINT',
      notNull: false,
    },
  });
};

exports.down = pgm => {
  pgm.dropTable('reviews');
};
