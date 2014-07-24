module.exports = function(req, res, next){
  var apitoken = req.header('apitoken');
  tokenFunctions.validate(req, res, apitoken, function(result){
    if(result){
      return next();
    }
    else {
      return res.send(400, 'Invalid API token. You shall not pass.');
    }
  });
}
