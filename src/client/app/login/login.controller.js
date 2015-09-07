(function () {
    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', LoginController);

    /* @ngInject */
    function LoginController($location, logger, AuthService) {
        var vm = this;
        vm.title = 'Login';
        vm.username = '';
        vm.password = '';
        vm.submitLogin = submitLogin;
        vm.submitReady = submitReady;

        activate();

        function submitLogin () {
            // call POST to authenticate
            AuthService.authenticate(vm.username, vm.password).then(authPromise);

            function authPromise (data) {
                if (data !== undefined) {
                    // Redirects to dashboard
                    logger.info('Success Login!');
                    $location.path('/');
                }
            }
        }

        function submitReady () {
            return vm.username !== '' && vm.password !== '';
        }

        function activate() {

        }
    }
})();
