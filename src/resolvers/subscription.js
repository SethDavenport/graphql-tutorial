const {
  pubsub,
  LINK_CHANNEL,
  NEW_LINK_CHANNEL,
  UPDATED_LINK_CHANNEL,
  DELETED_LINK_CHANNEL,
} = require('../pubsub');

const newLink = {
  subscribe: () => pubsub.asyncIterator(NEW_LINK_CHANNEL),
};

const updatedLink = {
  subscribe: () => pubsub.asyncIterator(UPDATED_LINK_CHANNEL),
};

const deletedLink = {
  subscribe: () => pubsub.asyncIterator(DELETED_LINK_CHANNEL),
};

module.exports = {
  newLink,
  updatedLink,
  deletedLink,
};
