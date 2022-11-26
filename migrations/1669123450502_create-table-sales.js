exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('sales', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
      notNull: true,
    },
    user: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: 'users',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    book: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: 'books',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    price_name: {
      type: 'VARCHAR(20)',
      notNull: true,
    },
    duration: {
      type: 'INT',
      notNull: true,
    },
    sub_total: {
      type: 'INT',
      notNull: true,
    },
    voucher: {
      type: 'INT',
      notNull: false,
    },
    total: {
      type: 'INT',
      notNull: true,
    },
    payment_method: {
      type: 'VARCHAR(10)',
      notNull: false,
    },
    status: {
      type: 'INT',
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
  pgm.dropTable('sales');
};
