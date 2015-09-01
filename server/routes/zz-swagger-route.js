(function() {
    "use strict";
    var path = require('path');
    module.exports = [
        {
            method: 'GET',
            path: '/documentation',
            handler: function (request, reply){
                reply.file(path.join(__dirname, '../public/index.html'));
            }
        }
    ];
})();
