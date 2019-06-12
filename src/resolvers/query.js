const info = () => 'Yo dawg I heard you like graphs.';

const feed = async (root, { filter, offset, limit }, { db }) => {
  let query = db('links')
    .orderBy('created_at', 'desc');

  let countQuery = db('links')
    .count('*');

  if (!!filter) {
    query = query.where('description', 'LIKE', `%${filter}%`);
    countQuery = countQuery.where('description', 'LIKE', `%${filter}%`);
  }

  if (offset !== undefined && offset !== null) {
    query = query.offset(offset);
  }

  if (limit !== undefined && limit !== null) {
    query = query.limit(limit);
  }

  const [{ count }] = await countQuery;
  return {
    links: await query,
    count,
  };
}

module.exports = {
  info,
  feed,
}
