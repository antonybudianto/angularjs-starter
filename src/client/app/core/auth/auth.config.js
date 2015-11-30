(function () {
    'use strict';

    angular
    .module('app.core.auth')
    .factory('authInterceptor', authInterceptor)
    .config(interceptorConfig);

    /* @ngInject */
    function authInterceptor($q, $window, logger) {
        var service = {
            request: request,
            responseError: responseError
        };

        return service;

        function request(config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token && !config.skipAuthorization) {
                config.headers.Authorization = 'Bearer ' +
                $window.sessionStorage.token;
            }
            return config;
        }

        function responseError(rejection) {
            if (rejection.status === 401) {
                logger.error('You are not authenticated.');
            }
            return $q.reject(rejection);
        }
    }

    /* @ngInject */
    function interceptorConfig ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    }

})();
