(function() {
    "use strict";
    var path = require('path');
    module.exports = [
        {
            method: 'GET',
            path: '/{p*}',
            config: {
              pre: [{ // hTML5 mode
                  assign: 'm1',
                  method: function (request, response){
                      var path = request.path.split('/');
                      var name = path[path.length-1];
                      if (name.indexOf('.') < 0){
                          request.path = '/index.html';
                          request.paramsArray = ['index.html'];
                      }
                      return response(true);

                  }
              }]
            },
            handler: {
                directory: {
                    path: path.join(__dirname, '../../client/dist'),
                    index: true
                }
            }
        }
    ];
})();
