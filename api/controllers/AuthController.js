/**
 * AuthController
 *
 * @description :: Server-side logic for managing authentication
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

//LIBRARY INCLUSIONS//
var token = require('../services/tokenfunctions.js');
/////////////////////

module.exports = {

    signup: function(req, res) {

        token.generate(function(token){
           console.log(token);
        });
    },

    login: function(req, res){

    }
	
};


