
exports.up = knex =>
  knex.schema.table('links', t => {
    t.integer('user_id').unsigned().notNullable();
    t.foreign('user_id')
      .references('users.id')
      .onDelete('CASCADE');
  });

exports.down = knex =>
  knex.schema.table('links', t =>
    t.dropColumn('user_id'));
