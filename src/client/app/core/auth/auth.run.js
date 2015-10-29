(function() {
    'use strict';

    angular
        .module('app.core.auth')
        .run(authRun);

    /* @ngInject */
    function authRun ($rootScope, $state, authService) {
        $rootScope.$on('$stateChangeStart', function(event, to, from) {
            if (from.afterLogin && authService.isAuth()) {
                event.preventDefault();
                $state.go(from.afterLogin);
                return;
            }

            if (!to.loginRequired || to.loginRequired === false) {
                return;
            }

            if (!authService.isAuth()) {
                event.preventDefault();
                $state.go('login', {'afterLogin': to.name});
                return;
            }
        });
    }
})();
