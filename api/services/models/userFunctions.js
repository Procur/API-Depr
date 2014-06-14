var handler = require('../errorHandlers.js');

module.exports = {
  findByApiToken: function(token, callback){

  },

  findByEmail: function(email, callback){
    User.findOne({ email: email}, function(err, user){
      callback(err, user);
    });
  },

  setEmailVerified: function(res, user, callback){
    User.update({ emailVerified: true }, function(err, user){
      handler.serverError(res, err);
      callback(user);
    });
  }
};