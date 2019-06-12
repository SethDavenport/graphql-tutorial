const info = () => 'Yo dawg I heard you like graphs.';

const feed = (root, args, { db }) => db('links');

module.exports = {
  info,
  feed,
}
