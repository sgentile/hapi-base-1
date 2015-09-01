"use strict";
var path = require('path');
module.exports = [
    {
        register: require('hapi-auth-jwt2'),
        options: {}
    },
    {
        register: require('hapi-io'),
        options: {
            socketio: {
                secure:true
            }
        }
    },
    {
        register: require('hapi-swagger'),
        options: {
            apiVersion: require('../../package.json').version,
            pathPrefixSize: 2,
            enableDocumentationPage:false,
            authorizations: {
                "token": {
                    type: "apiKey",
                    in: "header",
                    na: "Authorization"
                }
            }

        }
    }
];
