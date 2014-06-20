/**
 * AdministratorController
 *
 * @description :: Server-side logic for managing administrators
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var handler = require('../services/errorHandlers.js'),
    account = require('../services/models/userFunctions.js');

module.exports = {
	index: function(req, res){
    Administrator.find(function(err, administrators){
      handler.serverError(res, err);
      handler.notFound(res, administrators);
      res.status(200);
      res.json(administrators);
    });
  },

  create: function(req, res){
    account.findByApiToken(req, res, function(err, user){
      Administrator.findOne(user, function(err, administrator){
        handler.serverError(res, err);
        handler.notFound(res, administrator);

      })
    })
  }
};