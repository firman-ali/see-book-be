exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('prices', {
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
    list_price: {
      type: 'jsonb[]',
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
  pgm.dropTable('prices');
};
