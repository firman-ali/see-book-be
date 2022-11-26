exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('authentications', {
    token: {
      type: 'TEXT',
      notNull: true,
    },
    created_at: {
      type: 'BIGINT',
      notNull: true,
    },
  });
};

exports.down = pgm => {
  pgm.dropTable('authentications');
};
