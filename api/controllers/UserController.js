/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  create: function(req, res){
    console.log(req.session);
    var session = req.session.id = 5;
    sails.sockets.blast({msg: "adsfasdfadsf"}, req.socket);
  },

  update: function(req, res){

  },

  deactivate: function(req, res){

  }

};

