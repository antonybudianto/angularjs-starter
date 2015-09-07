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
                .then(success)
                .catch(fail);

            function success(response) {
                setAuth(response.data.id);
                return response.data;
            }

            function fail(e) {
                return exception.catcher('Fail authenticating: ')(e);
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
