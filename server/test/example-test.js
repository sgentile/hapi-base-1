'use strict';
var Code = require('code');
var Lab = require('lab');
var Hoek = require('hoek');
var Async = require('async');
var Hapi = require('hapi');
var setup = require('./server');

var lab = exports.lab = Lab.script();
/* jshint ignore:start */
var beforeEach = lab.beforeEach;
var describe = lab.describe;
var expect = Code.expect;
var it = lab.it;
/* jshint ignore:end */
var before = lab.before;
var after = lab.after;
var experiment = lab.experiment;
var test = lab.test;


experiment('Auth Route', function (){
    var server;
    before(function (done){
        setup.getServer(function(err, s){
            server = s;
            done();
        });
    });

    after(function(done) {
        return setup.rollback(server, done);
    });

/*
    test('can login', function (done) {
        server.inject({
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            url: '/api/auth',
            payload: {
                email: "",
                password: ""
            }
        }, function(res) {

            expect(res.statusCode).to.equal(200);
            expect(res.result).to.be.an.object();
            expect(res.result.token).to.exist();

            done();
        });
    });
    */
});
