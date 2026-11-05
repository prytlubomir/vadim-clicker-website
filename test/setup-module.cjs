const { once } = require('node:events');
const { server, host } = require('../index.js');

async function globalSetup() {
  await once(server, 'listening');

  const address = server.address();
  process.env.TEST_SERVER_ORIGIN =
    `http://${host}:${address.port}`;
}

async function globalTeardown() {
  await new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  });
}

module.exports = { globalSetup, globalTeardown }
