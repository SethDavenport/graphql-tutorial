const knex = require('knex');

module.exports = {
  db: knex({
    client: 'pg',
    connection: 'postgres://localhost:5432/hackernews_node',
    debug: true,
    ssl: false,
  }),
};
