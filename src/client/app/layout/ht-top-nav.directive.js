(function() {
    'use strict';

    angular
        .module('app.layout')
        .directive('htTopNav', htTopNav);

    /* @ngInject */
    function htTopNav ($state, authService, constant) {
        var directive = {
            bindToController: true,
            controller: TopNavController,
            controllerAs: 'vm',
            restrict: 'EA',
            scope: {
                'navline': '='
            },
            templateUrl: 'app/layout/ht-top-nav.html'
        };

        /* @ngInject */
        function TopNavController() {
            var vm = this;
            vm.appName = constant.APP_NAME;
            vm.isAuth = isAuth;
            vm.logout = logout;
            vm.isCurrent = isCurrent;
        }

        function isAuth () {
            return authService.isAuth();
        }

        function logout () {
            return authService.logout();
        }

        function isCurrent(route) {
            return $state.is(route) ? 'active' : '';
        }

        return directive;
    }
})();
