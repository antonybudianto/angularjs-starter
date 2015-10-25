(function () {
    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', LoginController);

    /* @ngInject */
    function LoginController($state, logger, authService) {
        var vm = this;
        vm.submitLogin = submitLogin;
        vm.submitReady = submitReady;

        activate();

        function submitLogin () {
            authService.authenticate(vm.username, vm.password).then(resolve, reject);

            function resolve (response) {
                logger.info('Login success', null, 'Success');
                $state.go('dashboard');
            }

            function reject (e) {
                logger.error(e.data.description, e, 'Error');
            }
        }

        function submitReady () {
            return vm.username !== '' && vm.password !== '';
        }

        function activate() {
            vm.title = 'Login';
            vm.username = '';
            vm.password = '';
            vm.login = {};
        }
    }
})();
