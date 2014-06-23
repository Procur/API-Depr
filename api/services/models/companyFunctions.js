var handler = require('../errorHandlers.js'),
    account = require('../models/userFunctions.js');
module.exports = {

  findByApiToken: function(res, token, callback){
    ///THIS IS PURELY FOR TESTING. NOT FOR PRODUCTION. REBUILD
    ApiToken.findOne({ token: token }, function(err, token){
      User.findOne({ id: token.user }).populate('company').exec(function(err, res){
        Company.findOne({ users: user }, function(err, company){
          handler.serverError(res, err);
          handler.notFound(res, company);
          callback(company);
        });
      });
    });
  }

};