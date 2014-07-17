/**
 * CompanyController
 *
 * @description :: Server-side logic for managing companies
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var account = require('../services/models/userFunctions.js'),
    handler = require('../services/errorHandlers.js'),
    company = require('../services/models/companyFunctions.js');

module.exports = {

  create: function(req, res){
    var p = req.query,
    apitoken = req.headers.apitoken;
    if(apitoken !== undefined){
      account.findByApiToken(res, apitoken, function(err, user){
        handler.serverError(res, err);
        handler.notFound(res, user);
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
    }
    else {
      res.send(400, 'No API Token provided.');
    }
  },

  show: function(req, res){
    var apitoken = req.headers.apitoken;
    company.findByApiToken(res, apitoken, function(company){
      handler.serverError(res, err);
      handler.notFound(res, company);
      res.status(200);
      res.json(company);
    });
  },

  update: function(req, res){

  },

  deactivate: function(req, res){
    var apitoken = req.headers.apitoken;
    company.findByApiToken(res, apitoken, function(company){
      handler.serverError(res, err);
      handler.notFound(res, company);
      Company.update(company, { active: false }, function(err, company){
        handler.serverError(res, err);
        handler.notFound(res, company);
        res.status(200);
        res.json(company);
      });
    });
  },

  //ADMIN ONLY ACTIONS

  findAll: function(req, res){
    Company.find({}, function(err, companies){
      handler.serverError(res, err);
      res.status(200);
      res.json(companies);
    });
  }
};
