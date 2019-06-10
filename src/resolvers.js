const links = [{
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
    Link: {
      url: () => 'http://yodawg.com/'
    },
  },
};
