/*

Tests API Service Scripts

*/

var expect = require('chai').expect;
var should = require('should');
var assert = require('assert');
var request = require('supertest');
var tokenGenerator = require('../api/services/tokenFunctions.js');

//SERVICE INCLUSIONS
var authFunctions = require('../api/services/authFunctions.js');


describe('HashPassword test', function(){
  it("Should test for proper password hashing", function(done){
    authFunctions.hashPassword('password', function(err, hash){
      expect(hash).to.not.equal('password');
      done();
    });
  });
});
