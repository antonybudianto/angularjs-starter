(function () {
    'use strict';

    var app = angular.module('app.core');

    app.factory('authInterceptor', ['$rootScope', '$q', '$window', 'toastr', authInterceptor]);

    function authInterceptor($rootScope, $q, $window, toastr) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                if ($window.sessionStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
                }
                return config;
            },
            responseError: function (rejection) {
                if (rejection.status === 401) {
                    toastr.error('You are not authenticated.');
                }
                return $q.reject(rejection);
            }
        };
    }

    app.config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    });
})();
