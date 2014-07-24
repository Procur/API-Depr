/**
 * AdministratorController
 *
 * @description :: Server-side logic for managing administrators
 */


module.exports = {
	index: function(req, res){
    Administrator.find(function(err, administrators){
      errorHandlers.serverError(res, err);
      errorHandlers.notFound(res, administrators);

      var adminIdList = [];
      administrators.forEach(function(admin){
        adminIdList.push(admin.user);
      });
      User.find().where({id: adminIdList}).exec(function(err, admins){
        errorHandlers.serverError(res, err);
        errorHandlers.notFound(res, admins);
        res.status(200);
        res.json(admins);
      });
    });
  },

  create: function(req, res){
    var email = req.query.email;
    userFunctions.findByEmail(email, function(err, user){
      errorHandlers.serverError(res, err);
      errorHandlers.notFound(res, user);
      if(user !== undefined){
        Administrator.findOne({ email: user.email}, function(err, admin){
          errorHandlers.serverError(res, err);
          errorHandlers.notFound(res, admin);
          if(admin === undefined){
            Administrator.create({ email: user.email, user: user.id }, function(err, admin){
              errorHandlers.serverError(res, err);
              errorHandlers.notFound(res, admin);
              if(admin !== undefined) {
                res.json(200, admin);
              }
            });
          }
          else {
            res.send(400, 'User is already an administrator.');
          }
        });
      }
    });
  }
};
