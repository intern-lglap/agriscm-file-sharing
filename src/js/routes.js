const Express = require('express');
const truffleConnection = require('../connection/contract');

module.exports.handleRoutes = async function handleRoutes(app) {
  // Initialize connection to Smart Contract
  await truffleConnection.init();
  // TODO: Test if app actually waits for initialization before calling other functions

  const router = Express.Router();

  /* TODO: Define api routes here */

  app.use('/api', router);
};
