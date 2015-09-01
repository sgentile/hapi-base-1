(function(){
    "use strict";
    var Promise = require('bluebird'),
    jwt = require('jsonwebtoken'),
    config = require("../common.js").config();

    function signToken(user) {
        var opt = {
            expiresInMinutes: config.tokenExpiration,
            issuer: config.tokenIssuer
        };
        return jwt.sign(user, config.privateKey, opt);
    }

    module.exports = {
        /*
        * Validate is used as a part of server
        * ie.
        * server.auth.strategy('token', 'jwt', {
            key: config.privateKey,
            validateFunc: auth.validate
           });
        * */
        validate: function (decodedToken, request, callback) {
            var error;
            if (decodedToken.id){
                return callback(error, true, decodedToken);
            }else{
                return callback(error, false, {});
            }
        },
        isInRole: function(credentials, role) {
            return credentials.role === role;
        },
        getAuthToken: function (request) {
            if(request.payload.email.toLowerCase() === 'admin@hapi-base.com' && request.payload.password === 'password') {
                return signToken(jsonUser);	
            } else {
                return null;
            }
        },
        getRefreshToken: function (request) {
            var currentToken,
                isAuthorized = false;
            if (request.headers.authorization) {
                currentToken = request.headers.authorization.split(" ");
                if (currentToken && currentToken.length > 0) {
                    var profile = jwt.verify(currentToken[1], config.privateKey);
                    if (profile) {
                        isAuthorized = true;
                        return signToken(profile);
                    }
                }
            }
            if (!isAuthorized) {
                return Promise.resolve(null);
            }
        }
    };

})();

