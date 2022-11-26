/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createFunction(
    'add_book_rating',
    [],
    {
      returns: 'trigger',
      language: 'plpgsql',
      replace: true,
    },
    `BEGIN
        INSERT INTO book_ratings VALUES(NEW.id, 0, 0);
      RETURN NULL;
      END`,
  );
};

exports.down = pgm => {
  pgm.dropFunction('add_book_rating');
};
