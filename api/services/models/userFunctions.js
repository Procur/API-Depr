var handler = require('../errorHandlers.js');

module.exports = {
  findByToken: function(token, callback){

  },

  findByEmail: function(email, callback){
    User.findOne({ email: email}, function(err, user){
      callback(err, user);
    });
  }
}