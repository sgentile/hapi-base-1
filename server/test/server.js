'use strict';

exports.getServer = function getServer (cb){
    var common =  require('../common');
    var config = common.config('test');
    var plugins = common.plugins('test');

    var Hapi = require('hapi');
    var auth = require("../services/auth");
    var server = new Hapi.Server();
    var Promise = require('bluebird');

    server.connection({ port: config.port });

    server.register(plugins, function (err) {
        if (err) {throw err;}

        // Enable Authentication
        server.auth.strategy('token', 'jwt', {
            key: config.privateKey,
            validateFunc: auth.validate
        });

        server.register({
            register: require('hapi-router'),
            options: {
                cwd: __dirname,
                routes: '../routes/*-route.js' // uses glob to include files
            }
        }, function (err) {
            if (err) { throw err; }
        });

		cb(err, server);
    });
};

exports.getToken = function getToken(server, email, password, cb) {
    var JWT  = require('jsonwebtoken');
    server.inject({
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        url: '/api/auth',
        payload: {
            email: email,
            password: password
        }
    }, function (res) {
        var user = JWT.decode(res.result.token);

        cb('Bearer ' + res.result.token, user);
    });
};

exports.rollback = function rollback(server, cb) {
    var Promise = require('bluebird');

	cb();
};

