/*

Tests API utility functions

*/

var expect = require('chai').expect;
var should = require('should');
var assert = require('assert');
var request = require('supertest');
var tokenGenerator = require('../api/services/tokenFunctions.js');


//TESTS API HEARTBEAT -- [GET /]
describe('Tests heartbeat', function(){
  var url = "http://localhost:1337";

  it('Should test API version response', function(){
    request(url).get('/').end(function(err, response){
      response.should.have.status(200);
      response.should.be.a('string');
    });
  });
});
