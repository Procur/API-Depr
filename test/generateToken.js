/*

Tests for correct generation of API token

*/

"use strict"
var expect = require('chai').expect;
var should = require('should');
var assert = require('assert');
var request = require('supertest');
var tokenGenerator = require('../api/services/tokenFunctions.js');

describe('Generate Token', function(){
    it("Should generate a valid API token", function(done){
      tokenGenerator.generate(function(err, token){
        expect(token).to.be.a('string');
        done();
      });
    });
});
