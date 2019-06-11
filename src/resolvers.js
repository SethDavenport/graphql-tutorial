const { find } = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const toDbId = apiId => +apiId.replace(/^\w*-/, '');
const hashPassword = password => bcrypt.hash(password, 10);
const APPLICATION_SECRET = '8iMiySt+ZUGCwJS6d2bzTA2f1c9d262e624f4c9e36dd211f11f616';

module.exports = {
  resolvers: {
    Query: {
      info: () => 'Yo dawg I heard you like graphs.',
      feed: (root, args, { db }) => db('links'),
    },
    Mutation: {
      createLink: async (parent, { description, url }, { db }) => {
        const [record] = await db('links')
          .insert({ description, url })
          .returning('*');
        return record;
      },

      updateLink: async (parent, { id, url, description }, { db }) => {
        const [record] = await db('links')
          .where({ id: toDbId(id) })
          .update({ url, description })
          .returning('*')
          .limit(1);
          return record;
      },
      
      destroyLink: async (parent, { id }, { db }) =>
        (await db('links')
          .where({ id: toDbId(id) })
          .delete()
          .limit(1)) > 0,

      signup: async (parent, { email, password, name }, { db }) => {
        const [user] = await db('users')
          .insert({ email, name, password: await hashPassword(password) })
          .returning('*');
        return {
          token: jwt.sign({ userId: user.id }, APPLICATION_SECRET),
          user,
        };
      },

      login: async (parent, { email, password }, { db }) => {
        console.log('WTF MANG', email, password, await hashPassword(password))
        const [user] = await db('users')
          .where({ email, password: await hashPassword(password) })
          .limit(1);
        if (!user) {
          throw new Error('NO API FOR U');
        }

        return {
          token: jwt.sign({ userId: user.id }, APPLICATION_SECRET),
          user,
        };
      }
    },
    Link: {
      id: parent => `link-${parent.id}`,
    },
    User: {
      id: parent => `user-${parent.id}`,
    }
  },
};
