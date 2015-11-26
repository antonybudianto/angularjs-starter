(function() {
    'use strict';

    angular
        .module('app.admin')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper, $location) {
        routerHelper.configureStates(getStates($location));
    }

    function getStates($location) {
        return [
            {
                state: 'admin',
                config: {
                    url: '/admin',
                    templateUrl: 'app/admin/admin.html',
                    controller: 'AdminController',
                    controllerAs: 'vm',
                    title: 'Admin',
                    loginRequired: true,
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-lock"></i> Admin'
                    }
                }
            }
        ];
    }
})();
