const id = parent => `user-${parent.id}`;

const links = (parent, args, { db }) =>
  db('links').where({ user_id: parent.id });

module.exports = {
  id,
  links,
};
