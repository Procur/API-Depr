/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var handler = require('../services/errorHandlers.js');

module.exports = {

  create: function(req, res){

  },

  update: function(req, res){

  },

  deactivate: function(req, res){

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

