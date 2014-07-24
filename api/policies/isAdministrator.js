/**
 * isAdministrator
 *
 * @module      :: Policy
 * @description :: Checks for a user's administrator status
 *
 */

module.exports = function(req, res, next) {
  administratorFunctions.findByApiToken(req, res, function(admin){
    if(admin){
      return next();
    }
    else {
      res.send(401, 'Insufficient permissions');
    }
  });
};
