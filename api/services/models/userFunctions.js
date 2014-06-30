var handler = require('../errorHandlers.js');

module.exports = {

  findByApiToken: function(req, res, callback){
    var token = req.headers.apitoken;
    ApiToken.findOne({ token: token }, function(err, token){
      handler.serverError(res, err);
      if(token === undefined){ return res.send(400, 'Invalid API token'); };
      User.findOne({ id: token.user }, function(err, user){
        handler.serverError(res, err);
        callback(err, user);
      });
    });
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
/* ////  DEPRECATED ACTIONS  ////

findByApiToken: function(res, token, callback) {
  ApiToken.findOne({ token: token }, function (err, token) {
    handler.serverError(res, err);
    if (token === undefined) {
      return res.send(400, 'Invalid API token');
    };
    User.findOne({ id: token.user }, function (err, user) {
      handler.serverError(res, err);
      callback(err, user);
    });
  });
}

 */