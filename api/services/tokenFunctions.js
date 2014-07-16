var bcrypt = require('bcrypt'),
    crypto = require('crypto');

module.exports = {
  generate: function (callback) {
    crypto.randomBytes(128, function (err, baseHash) {
      var prehash = baseHash.toString('base64').replace(/\//g, '_').replace(/\+/g, '-');
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(prehash, salt, function (err, hash) {
          callback(err, hash);
        });
      });
    });
  },

  saveToken: function(user, apitoken, callback){
    var currentDate = new Date();
    var expirationDate = currentDate.setDate(currentDate.getDate() + 7);
    ApiToken.create({ user: user.id, token: apitoken, activeUntil: expirationDate }, function(err, token){
      callback(err, token);
    });
  },

  hash: function(token, callback) {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(token, salt, function (err, hash) {
        callback(err, hash);
      });
    });
  },

  generateExpiry: function(){
    var d = new Date();
    d.setDate(d.getDate() + 7);
    return d;
  },

  validate: function (req, res, token, callback) {
    ApiToken.findOne({ token: token }, function(err, apitoken){
      var currentDate = new Date();
      if(err){ return res.send(500, 'Lost in space!'); }
      else if(apitoken === undefined){ return res.send(400, 'Invalid API token'); }
      else if(apitoken.expiry < currentDate){
        ApiToken.destroy(apitoken, function(err, deletedToken){
          if(err){ return res.send(500, 'Lost in space!'); }
          return res.send(400, 'Expired API token');
        });
      }
      else{
        callback(true);
      }
    });
  }
};
