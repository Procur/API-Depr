/**
 * CompanyController
 *
 * @description :: Server-side logic for managing companies
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var account = require('../services/models/userFunctions.js'),
    handler = require('../services/errorHandlers.js');

module.exports = {

  create: function(req, res){
    var p = req.query,
        apitoken = req.headers.apitoken;
    account.findByApiToken(res, apitoken, function(err, user){
      console.log(user);
      handler.serverError(res, err);
      Company.create({
        users: user,
        name: p.name,
        phoneNumberCountryCode: p.phoneNumberCountryCode,
        phoneNumber: p.phoneNumber,
        phoneExtension: p.phoneExtension,
        faxCountryCode: p.faxCountryCode,
        faxNumber: p.faxNumber,
        faxExtension: p.faxExtension,
        email: p.email,
        website: p.website,
        industry: p.industry,
        employeeCount: p.employeeCount,
        active: true
      }, function(err, company){
        console.log(err);
        handler.serverError(res, err);
        //add location
        res.json(company);
      });
    });


  },

  show: function(req, res){

  },

  update: function(req, res){

  },

  deactivate: function(req, res){

  }
};

