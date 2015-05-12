(function () {
    'use strict';
    var fs = require('fs'),
        path = require('path'),
        routesExp = {

        initConfigRoutes: function (app, route) {
//        API Routes to use
            var baseURL =  '/' + route;
            app.get(baseURL, get);

            app.post(baseURL, post);
            app.put(baseURL, put);
        }

    };


    function get(req, res) {

        var response=JSON.parse(fs.readFileSync(path.resolve(__dirname, './json/file.json')), 'utf8');

        return res.send(response);
    }
    function post(req, res) {
        // Do your stuff with request and response
        return res.send({"holPost": 3});
    }
    function put(req, res) {
        // Do your stuff with request and response
        return res.send('PUT request to homepage');
    }

    module.exports = routesExp;
}());

