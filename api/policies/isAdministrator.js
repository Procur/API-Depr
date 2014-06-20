/**
 * isAdministrator
 *
 * @module      :: Policy
 * @description :: Checks for a user's administrator status
 *
 */

var handler = require('../services/errorHandlers.js'),
    administrator = require('../services/models/administratorFunctions.js');

module.exports = function(req, res, next) {
  administrator.findByApiToken(req, res, function(admin){
    if(admin){
      return next();
    }
    else {
      res.send(401, 'Insufficient permissions');
    }
  })
};
