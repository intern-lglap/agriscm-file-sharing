const autoBind = require('auto-bind');

class BaseController {
  constructor(truffleConnection) {
    this.connection = truffleConnection;
    autoBind(this);
  }

  // Create farm
  async createFarm(req, res) {
    this.connection.createFarm((createdFarmId) => {
      console.log(createdFarmId);
      // TODO: do something useful instead of just returning an object
      res.status(200).json(createdFarmId);
    });
  }

  /*  TODO: Write more functions correlating to API endpoints here

      @dev: Check /connection/contract.js to know
      which functions are available and what they return */
}

module.exports = BaseController;
