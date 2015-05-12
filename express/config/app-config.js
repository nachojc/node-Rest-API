(function(){
    'use strict';
    var bodyParser = require('body-parser'),
        compression = require('compression'),
        cookieSession = require('cookie-session'),

/*        mongoose = require('mongoose'),
        dbName = 'movieDB',
        connectionString = 'mongodb://localhost:27017/' + dbName,
*/        enviroment;

    enviroment = {
        env:{
            express:{
                portAPI:4000,
                path:'./express/',
                mock:'API/'
            },
            dev:{
                pathRoot:require('path').resolve('.')
            },
            dist:{}
        },
        initConfigExpressRestAPI: function (app,express, env) {
            console.log(this.env.dev.pathRoot);

            app.use(express.static(env.pathRoot));
            app.set('port',this.env.express.portAPI);
            app.use(bodyParser.urlencoded({
                extended: true
            }));
            app.use(bodyParser.json());
            app.use(compression());
            app.use(cookieSession({
                keys: ['secret1', 'secret2']
            }));
            app.use(allowCrossDomain);

        },
        initConfigExpressHTML:function(app,express, env){
            console.log(this.env.dev.pathRoot);

        }

    };

    function allowCrossDomain (req, res, next) {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");

        next();
    }


    module.exports = enviroment;
}());

