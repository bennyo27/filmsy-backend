exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", tbl => {
    tbl.increments().unique();
    // id from auth0
    tbl
      .string("username")
      .notNullable()
      .unique();
    tbl
      .string("email")
      .notNullable()
      .unique();
    tbl.boolean("email_verified");
    tbl.date("date_created");
    tbl.date("last_login");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
