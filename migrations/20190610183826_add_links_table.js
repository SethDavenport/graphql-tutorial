
exports.up = knex =>
  knex.schema.createTable('links', t => {
    t.increments('id').primary();
    t.timestamps();
    t.string('url');
    t.string('description');
  });

exports.down = knex =>
  knex.schema.dropTable('links');
