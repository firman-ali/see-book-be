/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('book_ratings', {
    book: {
      type: 'VARCHAR(50)',
      notNull: true,
      unique: true,
      references: 'books',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    rating: {
      type: 'REAL',
      notNull: true,
    },
    total_review: {
      type: 'BIGINT',
      notNull: true,
    },
  });
};

exports.down = pgm => {
  pgm.dropTable('book_ratings');
};
