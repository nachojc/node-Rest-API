(function(){
    'use strict';



    var fs = require('fs'),
        path = require('path');

    module.exports = {
            initConfigRoutes: function (app,fileConfig) {
//        API Routes to use
                var files = fs.readdirSync(fileConfig.path+ fileConfig.mock );

                files.forEach(function (file) {
                    var fileName = path.basename(file, '.js');
                    exports[fileName] = require('../'+ fileConfig.mock + fileName + '/define');
                    exports[fileName].initConfigRoutes(app,file);

                });
            }

    };


}());

