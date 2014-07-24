
module.exports = {
  findByApiToken: function(req, res, callback){
    var apitoken = req.headers.apitoken;
    userFunctions.findByApiToken(res, apitoken, function(err, user){
      errorHandlers.serverError(res, err);
      errorHandlers.notFound(res, user);
      Administrator.findOne({ email: user.email }, function(err, administrator){
        errorHandlers.serverError(res, err);
        callback(administrator);
      });
    });
  },

  findByEmail: function(email, callback){
    User.findOne({ email: email}, function(err, user){
      callback(err, user);
    });
  }
};
