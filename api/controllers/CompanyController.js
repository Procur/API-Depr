/**
 * CompanyController
 *
 * @description :: Server-side logic for managing companies
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */


module.exports = {

  create: function(req, res){
    var p = req.query,
    apitoken = req.headers.apitoken;
    if(apitoken !== undefined){
      userFunctions.findByApiToken(res, apitoken, function(err, user){
        errorHandlers.serverError(res, err);
        errorHandlers.notFound(res, user);
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
          errorHandlers.serverError(res, err);
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
    companyFunctions.findByApiToken(res, apitoken, function(company){
      errorHandlers.serverError(res, err);
      errorHandlers.notFound(res, company);
      res.status(200);
      res.json(company);
    });
  },

  update: function(req, res){

  },

  deactivate: function(req, res){
    var apitoken = req.headers.apitoken;
    companyFunctions.findByApiToken(res, apitoken, function(company){
      errorHandlers.serverError(res, err);
      errorHandlers.notFound(res, company);
      Company.update(company, { active: false }, function(err, company){
        errorHandlers.serverError(res, err);
        errorHandlers.notFound(res, company);
        res.status(200);
        res.json(company);
      });
    });
  },

  //ADMIN ONLY ACTIONS

  findAll: function(req, res){
    Company.find({}, function(err, companies){
      errorHandlers.serverError(res, err);
      res.status(200);
      res.json(companies);
    });
  }
};
