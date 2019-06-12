const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const APPLICATION_SECRET = '8iMiySt+ZUGCwJS6d2bzTA2f1c9d262e624f4c9e36dd211f11f616';

const toDbId = apiId => +apiId.replace(/^\w*-/, '');

const hashPassword = password => bcrypt.hash(password, 10);

const comparePassword = (password, hash) => bcrypt.compare(password, hash);

const getUserId = ({ request }) => {
  const authorization = request.get('Authorization');

  if (authorization) {
    const token = authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, APPLICATION_SECRET);

    return userId;
  }

  throw new Error('Not authenticated');
};

const makeToken = userDbId =>
  jwt.sign({ userId: `user-${userDbId}` }, APPLICATION_SECRET);

module.exports = {
  APPLICATION_SECRET,
  toDbId,
  hashPassword,
  comparePassword,
  getUserId,
  makeToken,
};
