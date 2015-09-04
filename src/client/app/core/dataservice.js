(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$q', 'exception', 'logger'];
    /* @ngInject */
    function dataservice($http, $q, exception, logger) {
        var service = {
            getMessageCount: getMessageCount,
            getWeatherStat: getWeatherStat,
            authenticate: authenticate,
        };

        return service;

        function getMessageCount() { return $q.when(72); }

        function getWeatherStat() {
            return $http.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22jakarta%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys')
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('XHR Failed for getPeople')(e);
            }
        }

        function authenticate(username, password) {
            return $http.post('/api/user/auth', {username: username, password: password})
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('Fail authenticating: ')(e);
            }
        }
    }
})();
