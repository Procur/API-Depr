/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var async = require('async');

module.exports = {

  create: function(req, res){

  },

  update: function(req, res){

  },

  deactivate: function(req, res){
    userFunctions.findByApiToken(req, res, function(err, user){
      User.update(user, {active: false}, function(err, user){
        errorHandlers.serverError(res, err);
        res.status(200);
        res.send(user);
      });
    });
  },

  //ADMIN ONLY ACTIONS

  findAll: function(req, res){
    User.find({}, function(err, users){
      errorHandlers.serverError(res, err);
      res.status(200);
      res.json(users);
    });
  }
};
