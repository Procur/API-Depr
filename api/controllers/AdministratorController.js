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

      var adminIdList = [];
      administrators.forEach(function(admin){
        console.log(admin.user);
        adminIdList.push(admin.user);
      });
      console.log(adminIdList);
      User.find().where({id: adminIdList}).exec(function(err, admins){
        handler.serverError(res, err);
        handler.notFound(res, admins);
        res.status(200);
        res.json(admins);
      });
    });
  },

  create: function(req, res){
    account.findByEmail(req, res, function(err, user){
      handler.serverError(res, err);
      handler.notFound(res, user);
      Administrator.create(user, function(err, admin){

      });
    });
  }
};
