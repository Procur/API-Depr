var handler = require('../errorHandlers.js'),
    account = require('../models/userFunctions.js');
module.exports = {

  findByApiToken: function(res, token, callback){
    ///THIS IS PURELY FOR TESTING. NOT FOR PRODUCTION. REBUILD
    ApiToken.findOne({ token: token }, function(err, token){
      User.findOne({ id: token.user }).populate('company').exec(function(err, res){
        callback(res);
      });
    });
  }

};