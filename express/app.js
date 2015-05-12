
var express = require('express'),
    http = require('http'),

    app = express(),
    config = require('./config/app-config'),
    routes = require('./config/app-routes');


config.initConfigExpressRestAPI(app, express, config.env.dev);

routes.initConfigRoutes(app,config.env.express);




http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
