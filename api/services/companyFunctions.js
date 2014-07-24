module.exports = {

  findByApiToken: function(res, token, callback){
    ///THIS IS PURELY FOR TESTING. NOT FOR PRODUCTION. REBUILD
    ApiToken.findOne({ token: token }, function(err, token){
      User.findOne({ id: token.user }).populate('company').exec(function(err, user){
        errorHandlers.serverError(res, err);
        errorHandlers.notFound(res, user);
        Company.findOne({ users: user }, function(err, company){
          errorHandlers.serverError(res, err);
          errorHandlers.notFound(res, company);
          callback(err, company);
        });
      });
    });
  }

};
