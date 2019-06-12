const {
  APPLICATION_SECRET,
  getUserId,
  toDbId,
  hashPassword,
  makeToken,
  comparePassword,
} = require('../utils');

const createLink = async (parent, { description, url }, context) => {
  const userId = getUserId(context);
  const [record] = await context.db('links')
    .insert({ description, url, user_id: toDbId(userId) })
    .returning('*');

  return record;
};

const updateLink = async (parent, { id, url, description }, context) => {
  const userId = getUserId(context)
  const [record] = await db('links')
    .where({ id: toDbId(id), user_id: toDbId(userId) })
    .update({ url, description })
    .returning('*')
    .limit(1);

  return record;
};

const destroyLink = async (parent, { id }, context) => {
  const userId = getUserId(context)
  const count = await db('links')
    .where({ id: toDbId(id), user_id: toDbId(userId) })
    .delete()
    .limit(1);

  return count > 0;
};

const signup = async (parent, { email, password, name }, { db }) => {
  const [user] = await db('users')
    .insert({ email, name, password: await hashPassword(password) })
    .returning('*');

  return {
    token: makeToken(user.id),
    user,
  };
};

const login = async (parent, { email, password }, { db }) => {
  const [user] = await db('users')
    .where({ email })
    .limit(1);

  if (!user) {
    throw new Error('NO API FOR U');
  }

  if (!(await comparePassword(password, user.password))) {
    throw new Error('NO API FOR U');
  }

  return {
    token: makeToken(user.id),
    user,
  };
};

module.exports = {
  createLink,
  updateLink,
  destroyLink,
  signup,
  login,
};
