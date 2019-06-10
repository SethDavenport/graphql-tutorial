const { readFile } = require('fs');
const { promisify } = require('util');
const { join } = require('path');

const readFileQ = promisify(readFile);

module.exports = {
  loadSchema: async relativePath =>
    (await readFileQ(join(__dirname, relativePath))).toString(),
};

