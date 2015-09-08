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
        vm.login = {};
        vm.submitLogin = submitLogin;
        vm.submitReady = submitReady;

        activate();

        function submitLogin () {
            // call POST to authenticate
            AuthService.authenticate(vm.username, vm.password).then(authPromise);

            function authPromise (response) {
                vm.login.status = response.status;
                vm.login.description = response.data.description;
                if (response.status === 200) {
                    // Redirects to dashboard
                    logger.info(vm.login.description);
                    $location.path('/');
                } else {
                    logger.error(vm.login.description);
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
