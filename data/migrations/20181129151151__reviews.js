exports.up = function(knex, Promise) {
  return knex.schema.createTable("reviews", tbl => {
    tbl.increments().unique();
    tbl
      .string("user_email")
      .references("email")
      .inTable("users")
      .notNullable();
    tbl.integer("movie_id").notNullable();
    tbl.integer("story");
    tbl.integer("audio");
    tbl.integer("visuals");
    tbl.integer("characters");
    tbl.integer("dialogue");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("reviews");
};
