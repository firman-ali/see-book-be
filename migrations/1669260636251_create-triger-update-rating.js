exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTrigger(
    'reviews',
    'update_rating',
    {
      when: 'AFTER',
      operation: 'INSERT',
      function: 'update_book_rating',
      level: 'ROW',
    },
  );
};

exports.down = pgm => {
  pgm.dropTrigger(
    'reviews',
    'update_rating',
  );
};
