/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createFunction(
    'update_book_rating',
    [],
    {
      returns: 'trigger',
      language: 'plpgsql',
      replace: true,
    },
    `DECLARE
        bookRating REAL;
        total BIGINT;
      BEGIN 
      SELECT AVG(rating) into bookRating FROM book_ratings WHERE book = NEW.book;
      SELECT count(*) into total FROM book_ratings WHERE book = NEW.book;
      UPDATE book_ratings SET rating = bookRating, total_review = total WHERE book = NEW.book;
      RETURN NULL;
      END`,
  );
};

exports.down = pgm => {
  pgm.dropFunction('update_book_rating');
};
