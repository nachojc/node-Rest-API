(function () {
    'use strict';
    var routesExp = {

            initConfigRoutes: function (app) {
//        API Routes to use
                var baseURL =  '/' ;
                app.get(baseURL, get);

                app.post(baseURL, post);
            }

        };


    function get(req, res) {
        return res.send({"holGet": 0});
    }

    function post(req, res) {
        // Do your stuff with request and response
        return res.send({"holPost": 1});
    }

    module.exports = routesExp;
}());

