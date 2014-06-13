/**
 * AuthController
 *
 * @description :: Server-side logic for managing authentication
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

// LIBRARY INCLUSIONS //
var token = require('../services/tokenfunctions.js');
var auth = require('../services/authFunctions.js');
///////////////////////

module.exports = {

  signup: function(req, res) {

    var params = req.params.all();
    auth.hashPassword(params.password, function(err, hash){
      if(err) { res.send(500, 'Lost in spaceee!'); }
      token.generate(function(err, apitoken){
        if(err){ return res.send(500, 'Lost in space!'); }
        token.hash(apitoken, function(err, encryptedToken){
          params.password = hash;
          User.create(params, function(err, user){
            if(err){ return res.send(500, 'Lost in space!'); }
            if(user === undefined) { return res.send(500, 'Lost in space!'); }
            var expiry = token.generateExpiry();
            ApiToken.create({ user: user.id, token: apitoken, activeUntil: expiry }, function(err, newToken){
              console.log(err);
              console.log(newToken);
              if((err) || (newToken === undefined)){ return res.send(500, 'Lost in spaceeeeeeee!'); }
              res.status(201);
              res.json(user);
            });
          });
        });
      });
    });
  },

  login: function(req, res){
    var email = req.header('email'),
        password = req.header('password');
    User.findOne({ email: email }, function(err, user){
      if(err) { return res.send(500, 'Lost in space!'); }
      if(user === undefined){ return res.send(400, 'Invalid email address'); }
      auth.verifyPassword(user.password, password, function(err, response){
        if(err){ return res.send(500, 'Lost in space!'); }
        if(response){
          ApiToken.findOne({ user: user.id }, function(err, tokenToDelete){
            if(err){ return res.send(500, 'Lost in space!'); }
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
  }
};


