/**
 * AuthController
 *
 * @description :: Server-side logic for managing authentication
 * @help        :: See http://links.sailsjs.org/docs/controllers
 *
 */

// LIBRARY INCLUSIONS //

///////////////////////

module.exports = {

  signup: function(req, res) {
    var params = req.params.all();
    //HASH SUBMITTED PASSWORD
    authFunctions.hashPassword(params.password, function(err, hash){
      params.password = hash;
      errorHandlers.serverError(res, err);
      //GENERATE API TOKEN  q
      tokenFunctions.generate(function(err, apitoken){
        errorHandlers.serverError(res, err);
        tokenFunctions.hash(apitoken, function(err, encryptedToken){
          errorHandlers.serverError(res, err);
          //CHECK FOR EXISTENCE OF SUBMITTED EMAIL ADDRESS
          userFunctions.findByEmail(params.email, function(err, user){
            if(user === undefined){
              //CREATE USER
              params.emailVerified = false;
              params.active = true;
              params.profileComplete = false;
              User.create(params, function(err, user){
                errorHandlers.serverError(res, err);
                if(user === undefined) { return res.send(500, 'Lost in space!'); }
                var expiry = tokenFunctions.generateExpiry();
                //CREATE API TOKEN
                ApiToken.create({ user: user.id, token: encryptedToken, activeUntil: expiry }, function(err, newToken){
                  if((err) || (newToken === undefined)){ return res.send(500, 'Lost in space!'); }
                  //SEND ACTIVATION EMAIL
                  mailFunctions.sendActivationEmail(res, user.email, function(res){
                  });
                  res.status(201);
                  user.token = newToken.token;
                  res.json(user);
                });
              });
            }
            else {
              res.status(400);
              return res.send('Email address already registered');
            }
          });
        });
      });
    });
  },

  login: function(req, res){
    var email = req.query.email,
        password = req.query.password;
    userFunctions.findByEmail(email, function(err, user){
      errorHandlers.serverError(res, err);
      if(user === undefined){ return res.send(400, 'Invalid email address'); }
      authFunctions.verifyPassword(user.password, password, function(err, response){
        errorHandlers.serverError(res, err);
        if(response){
          ApiToken.findOne({ user: user.id }, function(err, tokenToDelete){
            errorHandlers.serverError(res, err);
            if(tokenToDelete !== undefined){
              ApiToken.destroy(tokenToDelete, function(err, deletedToken){
                if((err) || (deletedToken === undefined)){ return res.send(500, 'Lost in space!'); }
                tokenFunctions.generate(function(err, apitoken){
                  if((err) || (apitoken === undefined)) { return res.send(500, 'Lost in space!'); }
                  var expiry = tokenFunctions.generateExpiry();
                  ApiToken.create({ user: user.id, token: apitoken, activeUntil: expiry }, function(err, token){
                    if((err) || (token === undefined)){ return res.send(500, 'Lost in space!');}
                    res.status(200);
                    user.token = tokenFunctions.token;
                    res.json(user);
                  });
                });
              });
            }
            else{
              tokenFunctions.generate(function(err, apitoken){
                if((err) || (apitoken === undefined)) { return res.send(500, 'Lost in space!'); }
                var expiry = tokenFunctions.generateExpiry();
                ApiToken.create({ user: user.id, token: apitoken, activeUntil: expiry }, function(err, token){
                  if((err) || (token === undefined)){ return res.send(500, 'Lost in space!');}
                  res.status(200);
                  user.token = tokenFunctions.token;
                  res.json(user);
                });
              });
            }
          });
        }
        else{
          return res.send(403, 'Invalid password');
        }
      });
    });
  },

  processEmailActivation: function(req, res){
    var activationToken = req.query.token;
    mailFunctions.processEmailActivation(req, res, activationToken, function(user){
      res.status(200, 'Email verified');
      res.json(user);
    });
  },

  changePassword: function(req, res){
    var submittedPassword = req.param('password'),
        token = req.param('apitoken');
    authFunctions.hashPassword(submittedPassword, function(err, hashedPassword){
      errorHandlers.serverError(res, err);
      userFunctions.findByApiToken(res, token, function(err, user){
        authFunctions.changePassword(user, hashedPassword, function(err, user){
          errorHandlers.serverError(res, err);
          res.status(200);
          res.json(user, 'Password changed');
        });
      });
    });
  },

  test: function(req, res){
    var token = req.headers.apitoken;
    console.log(token);
    companyFunctions.findByApiToken(res, token, function(err, company){
      res.json(company);
    });
  }
};
