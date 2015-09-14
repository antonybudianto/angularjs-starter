(function() {
    'use strict';

    angular
        .module('app.widget')
        .factory('weatherService', weatherService);

    /* @ngInject */
    function weatherService($http, exception, YWEATHER_URL) {
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
                return exception.catcher('XHR Failed for getWeather')(e);
            }
        }
    }
})();
