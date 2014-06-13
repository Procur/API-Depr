var token = require('../services/tokenFunctions.js');

module.exports = function(req, res){
  var apitoken = req.header('apitoken');
  token.validate(req, res, apitoken, function(result){
    if(result){
      return next();
    }
    else {
      return res.send(400, 'You shall not pass.');
    }
  });
}