exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('genres', {
    id: {
      type: 'SERIAL',
      primaryKey: true,
      notNull: true,
    },
    name: {
      type: 'TEXT',
      notNull: true,
    },
    description: {
      type: 'TEXT',
      notNull: false,
    },
    created_by: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: 'admins',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
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
  pgm.dropTable('genres');
};
