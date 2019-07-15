const Express = require('express');
const truffleConnection = require('../connection/contract');

module.exports.handleRoutes = async function handleRoutes(app) {
  // Initialize connection to Smart Contract
  await truffleConnection.init();

  const router = Express.Router();

  /* @dev: Define your routes here */

  app.use('/api', router);
};
