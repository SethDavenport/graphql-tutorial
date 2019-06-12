const {
  pubsub,
  NEW_LINK_CHANNEL,
  UPDATED_LINK_CHANNEL,
  DELETED_LINK_CHANNEL,
} = require('../pubsub');

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

  pubsub.publish(NEW_LINK_CHANNEL, { newLink: record });
  return record;
};

const updateLink = async (parent, { id, url, description }, context) => {
  const userId = getUserId(context)
  const [record] = await context.db('links')
    .where({ id: toDbId(id), user_id: toDbId(userId) })
    .update({ url, description })
    .returning('*')
    .limit(1);

  pubsub.publish(UPDATED_LINK_CHANNEL, { updatedLink: record });
  return record;
};

const destroyLink = async (parent, { id }, context) => {
  const userId = getUserId(context)
  const count = await context.db('links')
    .where({ id: toDbId(id), user_id: toDbId(userId) })
    .delete()
    .limit(1);

  const wasDeleted = count > 0;
  if (wasDeleted) {
    pubsub.publish(DELETED_LINK_CHANNEL, { deletedLink: id });
  }

  return wasDeleted;
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
