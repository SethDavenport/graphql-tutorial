const { find } = require('lodash');

let links = [{
  id: 'link-0',
  url: 'http://yodawg.com',
  description: 'I heard you like resolvers. So I put links in your resolvers so you can link while you resolve',
}];

module.exports = {
  resolvers: {
    Query: {
      info: () => 'Yo dawg I heard you like graphs.',
      feed: () => links,
    },
    Mutation: {
      post: (parent, args) => {
        const link = {
          id: `link-${links.length+1}`,
          description: args.description,
          url: args.url,
        };
        links.push(link);
        return link;
      },
      update: (parent, { id, url, description }) => {
        const updatee = find(links, { id });
        if (!!url) { updatee.url = url; }
        if (!!description) { updatee.description = description; }
        return updatee;
      },
      destroy: (parent, args) => {
        const originalCount = links.length;
        links = links.filter(link => link.id !== args.id);
        return links.length < originalCount;
      }
    },
    Link: {
      id: parent => parent.id,
      url: parent => parent.url,
      description: parent => parent.description,
    },
  },
};
