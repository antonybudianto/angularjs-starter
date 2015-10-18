(function() {
    'use strict';

    angular
        .module('app.core.data')
        .factory('weatherService', weatherService);

    /* @ngInject */
    function weatherService($http, YWEATHER_URL) {
        var service = {
            getWeather: getWeather
        };

        return service;

        ////////////////////
        function getWeather() {
            return $http.get(YWEATHER_URL)
            .then(success, fail);

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return e;
            }
        }
    }
})();
