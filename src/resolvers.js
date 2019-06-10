const { find } = require('lodash');

const toDbId = linkId => +linkId.replace(/^link-/, '');

module.exports = {
  resolvers: {
    Query: {
      info: () => 'Yo dawg I heard you like graphs.',
      feed: (root, args, { db }) => db('links'),
    },
    Mutation: {
      create: async (parent, { description, url }, { db }) => {
        const [record] = await db('links')
          .insert({ description, url })
          .returning('*');
        return record;
      },
      update: async (parent, { id, url, description }, { db }) => {
        const [record] = await db('links')
          .where({ id: toDbId(id) })
          .update({ url, description })
          .returning('*')
          .limit(1);
          return record;
      },
      destroy: async (parent, { id }, { db }) =>
        (await db('links')
          .where({ id: toDbId(id) })
          .delete()
          .limit(1)) > 0,
    },
    Link: {
      id: parent => `link-${parent.id}`,
      url: parent => parent.url,
      description: parent => parent.description,
    },
  },
};
