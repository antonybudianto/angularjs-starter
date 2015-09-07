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

            function authPromise (response) {
                vm.status = response.status;
                if (response.status === 200) {
                    // Redirects to dashboard
                    vm.status = response.status;
                    console.log(vm.status);
                    logger.info('Success Login!');
                    $location.path('/');
                } else {
                    logger.error('Login fail! Please try again');
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
