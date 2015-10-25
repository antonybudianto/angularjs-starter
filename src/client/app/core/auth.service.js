(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('authService', authService);

    /* @ngInject */
    function authService($http, $window, $state, $q, jwtHelper) {
        var service = {
            isAuth: isAuth,
            getToken: getToken,
            logout: logout,
            authenticate: authenticate
        };

        return service;

        function authenticate(username, password) {
            return $http.post('/api/auth', {username: username, password: password})
                .then(resolve, reject);

            function resolve(response) {
                var token = response.data.token;
                setToken(token);
                return $q.resolve(token);
            }

            function reject(e) {
                return $q.reject(e);
            }
        }

        function isAuth () {
            return getToken() && !jwtHelper.isTokenExpired(getToken());
        }

        function setToken (token) {
            $window.sessionStorage.token = token;
        }

        function getToken () {
            return $window.sessionStorage.token;
        }

        function logout () {
            delete $window.sessionStorage.token;
            $state.go('login');
        }
    }
})();
