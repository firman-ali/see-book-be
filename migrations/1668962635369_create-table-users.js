exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('users', {
    uid: {
      type: 'VARCHAR(50)',
      primaryKey: true,
      notNull: true,
    },
    email: {
      type: 'TEXT',
      notNull: true,
    },
    profile_pic: {
      type: 'TEXT',
      notNull: false,
    },
    name: {
      type: 'TEXT',
      notNull: true,
    },
    role: {
      type: 'INTEGER',
      notNull: true,
    },
    phone_number: {
      type: 'TEXT',
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
  });
};

exports.down = pgm => {
  pgm.dropTable('users');
};
