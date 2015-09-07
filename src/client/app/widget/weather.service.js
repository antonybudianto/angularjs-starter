(function() {
    'use strict';

    angular
        .module('app.widget')
        .service('WeatherService', WeatherService);

    /* @ngInject */
    function WeatherService($http, exception, YWEATHER_URL) {
        var vm = this;
        vm.getWeather = getWeather;

        function getWeather() {
            return $http.get(YWEATHER_URL)
            .then(success)
            .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('XHR Failed for getWeather')(e);
            }
        }
    }
})();
