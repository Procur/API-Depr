/**
 * AuthController
 *
 * @description :: Server-side logic for managing authentication
 * @help        :: See http://links.sailsjs.org/docs/controllers
 *
 */

// LIBRARY INCLUSIONS //
var token = require('../services/tokenFunctions.js'),
    auth = require('../services/authFunctions.js'),
    account = require('../services/models/userFunctions.js'),
    handler = require('../services/errorHandlers.js'),
    mailer = require('../services/utilities/mailFunctions.js');

///////////////////////

module.exports = {

  signup: function(req, res) {
    var params = req.params.all();
    //HASH SUBMITTED PASSWORD
    auth.hashPassword(params.password, function(err, hash){
      params.password = hash;
      handler.serverError(res, err);
      //GENERATE API TOKEN
      token.generate(function(err, apitoken){
        handler.serverError(res, err);
        token.hash(apitoken, function(err, encryptedToken){
          handler.serverError(res, err);
          //CHECK FOR EXISTENCE OF SUBMITTED EMAIL ADDRESS
          account.findByEmail(params.email, function(err, user){
            if(user === undefined){
              //CREATE USER
              params.emailVerified = false;
              params.active = true;
              params.profileComplete = false;
              User.create(params, function(err, user){
                handler.serverError(res, err);
                if(user === undefined) { return res.send(500, 'Lost in space!'); }
                var expiry = token.generateExpiry();
                //CREATE API TOKEN
                ApiToken.create({ user: user.id, token: encryptedToken, activeUntil: expiry }, function(err, newToken){
                  if((err) || (newToken === undefined)){ return res.send(500, 'Lost in space!'); }
                  //SEND ACTIVATION EMAIL
                  res.status(201);
                  user.token = newToken.token;
                  res.json(user);
                  mailer.sendActivationEmail(res, user.email, function(res){

                  });
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
    account.findByEmail(email, function(err, user){
      handler.serverError(res, err);
      if(user === undefined){ return res.send(400, 'Invalid email address'); }
      auth.verifyPassword(user.password, password, function(err, response){
        handler.serverError(res, err);
        if(response){
          ApiToken.findOne({ user: user.id }, function(err, tokenToDelete){
            handler.serverError(res, err);
            if(tokenToDelete !== undefined){
              ApiToken.destroy(tokenToDelete, function(err, deletedToken){
                if((err) || (deletedToken === undefined)){ return res.send(500, 'Lost in space!'); }
                token.generate(function(err, apitoken){
                  if((err) || (apitoken === undefined)) { return res.send(500, 'Lost in space!'); }
                  var expiry = token.generateExpiry();
                  ApiToken.create({ user: user.id, token: apitoken, activeUntil: expiry }, function(err, token){
                    if((err) || (token === undefined)){ return res.send(500, 'Lost in space!');}
                    res.status(200);
                    user.token = token.token;
                    res.json(user);
                  });
                });
              });
            }
            else{
              token.generate(function(err, apitoken){
                if((err) || (apitoken === undefined)) { return res.send(500, 'Lost in space!'); }
                var expiry = token.generateExpiry();
                ApiToken.create({ user: user.id, token: apitoken, activeUntil: expiry }, function(err, token){
                  if((err) || (token === undefined)){ return res.send(500, 'Lost in space!');}
                  res.status(200);
                  user.token = token.token;
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
    mailer.processEmailActivation(req, res, activationToken, function(user){
      res.status(200);
      res.json(user, 'Email verified');
    });
  },

  changePassword: function(req, res){
    var submittedPassword = req.param('password'),
        token = req.param('apitoken');
    auth.hashPassword(submittedPassword, function(err, hashedPassword){
      handler.serverError(res, err);
      account.findByApiToken(res, token, function(err, user){
        auth.changePassword(user, hashedPassword, function(err, user){
          handler.serverError(res, err);
          res.status(200);
          res.json(user, 'Password changed');
        });
      });
    });
  },

  test: function(req, res){
    User.find(function(err, users){
     res.json(users);
    });
  }
};


