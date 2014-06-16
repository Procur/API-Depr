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
    var p = req.params,
        apitoken = req.headers.apitoken;
    account.findByApiToken(res, apitoken, function(err, user){
      handler.serverError(res, err);
      Company.create({
        user: token.user,
        name: p.companyName,
        phoneNumberCountryCode: p.companyPhoneCountryCode,
        phoneNumber: p.companyPhone,
        phoneExtension: p.companyPhoneExt,
        faxCountryCode: p.companyFaxCountryCode,
        faxNumber: p.companyFax,
        faxExtension: p.companyFaxExt,
        email: p.companyEmail,
        website: p.companyWebsite,
        industry: p.companyIndustry,
        employeeCount: p.companyEmployeeCount,
        active: true
      }, function(err, company){
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

