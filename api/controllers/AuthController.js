/**
 * AuthController
 *
 * @description :: Server-side logic for managing authentication
 * @help        :: See http://links.sailsjs.org/docs/controllers
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
    auth.hashPassword(params.password, function(err, hash){
      params.password = hash;
      handler.serverError(res, err);
      token.generate(function(err, apitoken){
        handler.serverError(res, err);
        token.hash(apitoken, function(err, encryptedToken){
          handler.serverError(res, err);
          account.findByEmail(params.email, function(err, user){
            if(user === undefined){
              User.create(params, function(err, user){
                handler.serverError(res, err);
                if(user === undefined) { return res.send(500, 'Lost in space!'); }
                var expiry = token.generateExpiry();
                ApiToken.create({ user: user.id, token: encryptedToken, activeUntil: expiry }, function(err, newToken){
                  console.log(err);
                  console.log(newToken);
                  if((err) || (newToken === undefined)){ return res.send(500, 'Lost in space!'); }
                  mailer.sendActivationEmail(res, user.email, function(res){
                    res.status(201);
                    res.json([user, newToken]);
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
    var email = req.header('email'),
        password = req.header('password');
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
                    res.json([user, token]);
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
                  res.json([user, token]);
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

  test: function(req, res){
    console.log(process.env.HOSTNAME);
  }
};


