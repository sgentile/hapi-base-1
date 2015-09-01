(function() {
    "use strict";

    var Joi = require("joi"),
        Boom = require('boom'),
        auth = require('../services/auth');

    var reject = function (reply){
        return function (err) {
            console.log('auth', err.stack);
            reply(Boom.wrap(err));
        };
    };

    module.exports = [
        {
            method: "POST",
            path: "/api/auth",
            config: {
                auth: false,
                tags: ['api'],
                validate: {
                    payload: {
                        email: Joi.string().required(),
                        password: Joi.string().required()
                    }
                }
            },
            handler: function (request, reply) {
                if (request.headers.authorization) {
                    reply(Boom.conflict('Already authenticated'));
                } else {
                    auth.getAuthToken(request).then(function(token){
                        if(token){
                            reply({token: token});
                        }else{
                            reply(Boom.unauthorized("Not authorized - please check your username and/or password"));
                        }
                    }, reject(reply));
                }
            }
        },
        {
            method: "POST",
            path: "/api/auth/refresh",
            config: {
                auth: 'token',
                tags: ['api']
            },
            handler: function (request, reply) {
                auth.getRefreshToken(request).then(function(token){
                    if(token){
                        reply({token: token});
                    }else{
                        reply(Boom.unauthorized("Not authorized - please check your username and/or password"));
                    }
                }, reject(reply));
            }
        }
    ];
})();
