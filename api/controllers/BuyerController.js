/**
 * BuyerController
 *
 * @description :: Server-side logic for managing buyers
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
    Buyer.find({}, function(err, buyers){
      handler.serverError(res, err);
      res.status(200);
      res.json(buyers);
    });
  }
};

