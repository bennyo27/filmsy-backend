exports.up = function(knex, Promise) {
  return knex.schema.createTable("reviews", tbl => {
    tbl.increments().unique();
    tbl
      .integer("user_email")
      .references("email")
      .inTable("users")
      .notNullable();
    tbl.integer("movie_id").notNullable();
    tbl.json("user_reviews").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("reviews");
};
