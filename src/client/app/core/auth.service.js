(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('authService', authService);

    //authService.$inject = [];

    /* @ngInject */
    function authService($http, $window, $state, exception, APP_AUTH_KEY) {
        var service = {
            isAuth: isAuth,
            logout: logout,
            authenticate: authenticate
        };
        return service;

        ///////////////////
        function authenticate(username, password) {
            return $http.post('/api/user/auth', {username: username, password: password})
                .then(success, fail);

            function success(response) {
                setAuth(response.data.user.id);
                return response;
            }

            function fail(e) {
                exception.catcher('Login failed')(e);
                return e;
            }
        }

        function isAuth () {
            return $window.localStorage.getItem(APP_AUTH_KEY) !== null;
        }

        function setAuth (id) {
            $window.localStorage.setItem(APP_AUTH_KEY, JSON.stringify({
                'id': id
            }));
        }

        function logout () {
            $window.localStorage.removeItem(APP_AUTH_KEY);
            $state.go('login');
        }
    }
})();
