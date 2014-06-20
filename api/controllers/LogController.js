/**
 * LogController
 *
 * @description :: Server-side logic for managing logs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var handler = require('../services/errorHandlers.js');
module.exports = {

  index: function(req, res){
    Log.find(function(err, logs){
      handler.serverError(res, err);
      res.status(200);
      res.json(logs);
    })
  }
	
};

