(function () {
    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', LoginController);

    //LoginController.$inject = ['logger', '$window'];
    /* @ngInject */
    function LoginController($window, dataservice, $location, AuthService) {
        var vm = this;
        vm.title = 'Login';
        vm.username = '';
        vm.password = '';
        vm.submitLogin = submitLogin;
        vm.submitReady = submitReady;

        activate();

        function submitLogin () {
            // call POST to authenticate
            console.log('authenticating');
            dataservice.authenticate(vm.username, vm.password).then(checkAuthResult);
        }

        function submitReady () {
            return vm.username !== '' && vm.password !== '';
        }

        function checkAuthResult (data) {
            if (data !== undefined) {
                // Setting localstorage
                $window.localStorage.setItem('user', JSON.stringify({
                    'id': data.id
                }));

                // Redirects to dashboard
                $location.path('/');
            }
        }

        function activate() {

        }
    }
})();
