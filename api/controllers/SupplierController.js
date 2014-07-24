/**
 * SupplierController
 *
 * @description :: Server-side logic for managing suppliers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */


module.exports = {

  create: function(req, res){

  },

  update: function(req, res){

  },

  deactivate: function(req, res){

  },

  //ADMIN ONLY ACTIONS

  findAll: function(req, res){
    Supplier.find({}, function(err, suppliers){
      errorHandlers.serverError(res, err);
      res.status(200);
      res.json(suppliers);
    });
  }
};
