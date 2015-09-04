(function() {
    'use strict';

    angular
        .module('app.core')
        .service('AuthService', AuthService);

    //AuthService.$inject = [];

    /* @ngInject */
    function AuthService($window, $state) {
        var key = 'user';
        var vm = this;
        vm.isAuth = isAuth;
        vm.logout = logout;

        function isAuth () {
            return $window.localStorage.getItem(key) !== null;
        }

        function logout () {
            $window.localStorage.removeItem(key);
            $state.go('login');
        }
    }
})();
