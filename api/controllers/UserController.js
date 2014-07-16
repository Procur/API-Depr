/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var handler = require('../services/errorHandlers.js'),
    account = require('../services/models/userFunctions.js'),
    async = require('async');

module.exports = {

  create: function(req, res){

  },

  update: function(req, res){

  },

  deactivate: function(req, res){
    account.findByApiToken(req, res, function(err, user){
      User.update(user, {active: false}, function(err, user){
        handler.serverError(res, err);
        res.status(200);
        res.send(user);
      });
    });
  },

  //ADMIN ONLY ACTIONS

  findAll: function(req, res){
    User.find({}, function(err, users){
      handler.serverError(res, err);
      res.status(200);
      res.json(users);
    });
  }
};
