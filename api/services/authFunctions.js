var bcrypt = require('bcrypt'),
    crypto = require('crypto');

module.exports = {
  hashPassword: function(password, callback){
    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(password, salt, function(err, hash){
        callback(err, hash);
      });
    });
  },

  verifyPassword: function(hash, submittedPassword, callback){
    bcrypt.compare(submittedPassword, hash, function(err, response){
      callback(err, response);
    });
  },

  changePassword: function(user, newPasswordHash, callback){
    User.update(user, { password: newPasswordHash }, function(err, user){
      callback(err, user);
    });
  }
};