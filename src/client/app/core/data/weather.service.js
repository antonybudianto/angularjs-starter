(function() {
    'use strict';

    angular
        .module('app.core.data')
        .factory('weatherService', weatherService);

    /* @ngInject */
    function weatherService($http, $q, YWEATHER_URL) {
        var service = {
            getWeather: getWeather
        };

        return service;

        function getWeather() {
            return $http.get(YWEATHER_URL, {
                skipAuthorization: true
            })
            .then(resolve, reject);

            function resolve(response) {
                return $q.resolve(response.data);
            }

            function reject(e) {
                return $q.reject(e);
            }
        }
    }
})();
