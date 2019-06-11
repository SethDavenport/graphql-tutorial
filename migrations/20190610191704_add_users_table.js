
exports.up = knex =>
  knex.schema.createTable('users', t => {
    t.increments('id').primary();
    t.timestamps();
    t.string('name');
    t.string('email');
    t.string('password'); // Actually a hash.
  });

exports.down = knex =>
  knex.schema.dropTable('users');
