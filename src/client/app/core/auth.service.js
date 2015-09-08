(function() {
    'use strict';

    angular
        .module('app.core')
        .service('AuthService', AuthService);

    //AuthService.$inject = [];

    /* @ngInject */
    function AuthService($http, $window, $state, exception) {
        var key = 'user';
        var vm = this;
        vm.isAuth = isAuth;
        vm.logout = logout;
        vm.authenticate = authenticate;

        function authenticate(username, password) {
            return $http.post('/api/user/auth', {username: username, password: password})
                .then(success, fail);

            function success(response) {
                setAuth(response.data.user.id);
                return response;
            }

            function fail(e) {
                return e;
            }
        }

        function isAuth () {
            return $window.localStorage.getItem(key) !== null;
        }

        function setAuth (id) {
            $window.localStorage.setItem(key, JSON.stringify({
                'id': id
            }));
        }

        function logout () {
            $window.localStorage.removeItem(key);
            $state.go('login');
        }
    }
})();
