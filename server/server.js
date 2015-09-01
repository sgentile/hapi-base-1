/* global process */
/* global __dirname */

(function(){
    "use strict";

    var common =  require('./common'),
        config = common.config(),
        plugins = common.plugins(),
        Hapi = require('hapi'),
        auth = require("./services/auth"),
        socketService = require('./services/socket-service');

    var server = new Hapi.Server({
        connections:{
            router: {
                isCaseSensitive: false,
                stripTrailingSlash: true
            }
        }
    }); //todo: consider redis or memcache for prod http://hapijs.com/tutorials/caching

    process.chdir(__dirname);

    server.connection({ port: process.env.PORT || config.port, host: config.host });

    server.register(plugins, function (err) {
        if (err) {throw err;}

        // Enable Authentication
        server.auth.strategy('token', 'jwt', {
            key: config.privateKey,
            validateFunc: auth.validate
        });

        // Register Routes
        server.register({
            register: require('hapi-router'),
            options: {
                cwd: __dirname,
                routes: 'routes/*-route.js' // uses glob to include files
            }
        }, function (err) {
            if (err) {throw err;}
        });
    });

    server.start(function () {
        console.info('Server running at:', server.info.uri, ', Environment:', process.env.NODE_ENV || 'local');
        var io = server.plugins['hapi-io'].io;
        socketService.connect(io);
    });
})();

