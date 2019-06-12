const { PubSub } = require('graphql-subscriptions');

const NEW_LINK_CHANNEL = 'link_new';
const UPDATED_LINK_CHANNEL = 'link_updated';
const DELETED_LINK_CHANNEL = 'link_deleted';

const pubsub = new PubSub();

module.exports = {
  NEW_LINK_CHANNEL,
  UPDATED_LINK_CHANNEL,
  DELETED_LINK_CHANNEL,
  pubsub,
};
