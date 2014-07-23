/**
 * AdministratorController
 *
 * @description :: Server-side logic for managing administrators
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
        adminIdList.push(admin.user);
      });
      User.find().where({id: adminIdList}).exec(function(err, admins){
        handler.serverError(res, err);
        handler.notFound(res, admins);
        res.status(200);
        res.json(admins);
      });
    });
  },

  create: function(req, res){
    var email = req.query.email;
    account.findByEmail(email, function(err, user){
      handler.serverError(res, err);
      handler.notFound(res, user);
      if(user !== undefined){
        Administrator.findOne({ email: user.email}, function(err, admin){
          handler.serverError(res, err);
          handler.notFound(res, admin);
          if(admin === undefined){
            Administrator.create({ email: user.email, user: user.id }, function(err, admin){
              handler.serverError(res, err);
              handler.notFound(res, admin);
              if(admin !== undefined) {
                res.json(200, admin);
              }
            });
          }
          else {
            res.send(400, 'User is already an administrator.');
          }
        });
      }
    });
  }
};
