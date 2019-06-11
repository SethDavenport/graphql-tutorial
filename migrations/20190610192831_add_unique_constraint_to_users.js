
exports.up = knex =>
  knex.schema.alterTable('users', t =>
    t.unique('email'));

exports.down = knex =>
  knex.schema.alterTable('users', t =>
    t.dropUnique('email'));
