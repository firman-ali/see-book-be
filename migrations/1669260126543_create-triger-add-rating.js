exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTrigger(
    'books',
    'add_rating',
    {
      when: 'AFTER',
      operation: 'INSERT',
      function: 'add_book_rating',
      level: 'ROW',
    },
  );
};

exports.down = pgm => {
  pgm.dropTrigger(
    'books',
    'add_rating',
  );
};
