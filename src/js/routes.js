const Express = require('express');

// const truffleConnection = require('../connection/contract');
// const Base = require('../controller/base');

// const BaseController = new Base(truffleConnection);
// console.log(JSON.stringify(BaseController));

module.exports.handleRoutes = function handleRoutes(app) {
  const router = Express.Router();

  /* TODO: Define api routes here */

  app.use('/api', router);
};
