module.exports = {

  findByApiToken: function(res, apitoken, callback){
    ApiToken.findOne({ token: apitoken }, function(err, token){
      errorHandlers.serverError(res, err);
      if(token === undefined){ return res.send(400, 'Invalid API token'); }
      User.findOne({ id: token.user }, function(err, user){
        errorHandlers.serverError(res, err);
        callback(err, user);
      });
    });
  },

  findByEmail: function(email, callback){
    User.findOne({ email: email}, function(err, user){
      callback(err, user);
    });
  }
};
/* ////  DEPRECATED ACTIONS  ////

findByApiToken: function(res, token, callback) {
  ApiToken.findOne({ token: token }, function (err, token) {
    errorHandlers.serverError(res, err);
    if (token === undefined) {
      return res.send(400, 'Invalid API token');
    };
    User.findOne({ id: token.user }, function (err, user) {
      errorHandlers.serverError(res, err);
      callback(err, user);
    });
  });
}

 */