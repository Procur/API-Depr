/*

Tests API utility functions

*/

var expect = require('chai').expect;
var should = require('should');
var assert = require('assert');
var request = require('supertest');
var tokenGenerator = require('../api/services/tokenFunctions.js');


//TESTS API HEARTBEAT -- [GET /]
describe('Heartbeat test', function(){
  var url = "http://localhost:1337";

  it('Should test API version response', function(){
    request(url).get('/').end(function(err, response){
      if(err){
        throw err;
      }
      response.should.have.status(200);
      done();
    });
  });
});
