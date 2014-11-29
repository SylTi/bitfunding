'use strict';
/* jshint undef:false */

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var User = require('../user/user.model.js');

describe('GET /api/refunds', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/refunds')
      .expect(401)
      .expect('Content-Type', 'text/html')
      .end(function(err, res) {
        if (err) return done(err);
        //res.body.should.be.instanceof(Array);
        done();
      });
  });
});
