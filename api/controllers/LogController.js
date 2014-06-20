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
  },

  show: function(req, res){
    var logId = req.query.id;
    console.log(logId);
    Log.findOne({ id: logId }, function(err, log){
      handler.serverError(res, err);
      if(log !== undefined){
        res.status(200);
        res.json(log);
      }
      else {
        res.send(400, "Requested log record was not found.");
      }
    })
  }
	
};

