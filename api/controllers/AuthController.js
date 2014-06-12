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
            if(err) { res.send(500, 'Lost in space!'); }
            token.generate(function(err, apitoken){
                if(err){ return res.send(500, 'Lost in space!'); }
                token.hash(apitoken, function(err, encryptedToken){
                    params.password = hash;
                    params.token = encryptedToken;
                    User.create(params, function(err, user){
                        if(err){ return res.send(500, 'Lost in space!'); }
                        if(user === undefined) { return res.send(500, 'Lost in space!'); }
                        res.status(201);
                        res.json(user);

                    });
                });
            });
        });
    },

    login: function(req, res){
        console.log('login');
    }
	
};


