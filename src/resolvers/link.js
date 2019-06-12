const id = parent => `link-${parent.id}`;

const postedBy = async (parent, args, { db }) => {
  const [user] = await db('users')
    .where({ id: parent.user_id });

  return user;
};

module.exports = {
  id,
  postedBy,
};
