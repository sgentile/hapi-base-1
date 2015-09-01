"use strict";
var path = require('path');
module.exports = [
    {
        register: require('hapi-auth-jwt2'),
        options: {}
    },
    {
        register: require('hapi-io'),
        options: {}
    }
];
