var handler = require('../errorHandlers.js'),
    account = require('./userFunctions.js');

module.exports = {
  findByApiToken: function(req, res, callback){
    account.findByApiToken(req, res, function(err, user){
      handler.serverError(res, err);
      handler.notFound(res, user);
      Administrator.findOne({ email: user.email }, function(err, administrator){
        handler.serverError(res, err);
        callback(administrator);
      })
    })
  },

  findByEmail: function(email, callback){
    User.findOne({ email: email}, function(err, user){
      callback(err, user);
    });
  }
};