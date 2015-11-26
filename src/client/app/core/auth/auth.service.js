(function() {
    'use strict';

    angular
        .module('app.core.auth')
        .factory('authService', authService);

    /* @ngInject */
    function authService($http, $window, $state, $q, jwtHelper) {
        var service = {
            isAuth: isAuth,
            getToken: getToken,
            getUser: getUser,
            logout: logout,
            authenticate: authenticate
        };

        return service;

        function authenticate(username, password) {
            return $http.post('/api/auth', {username: username, password: password})
                .then(resolve)
                .catch(reject);

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
            var token = getToken();
            return token && !jwtHelper.isTokenExpired(token);
        }

        function setToken (token) {
            $window.sessionStorage.token = token;
        }

        function getToken () {
            return $window.sessionStorage.token;
        }

        function getUser () {
            if (isAuth()) {
                return jwtHelper.decodeToken(getToken());
            }
            return null;
        }

        function logout () {
            delete $window.sessionStorage.token;
            $state.go('login', {
                message: 'You have logged out.'
            });
        }
    }
})();
