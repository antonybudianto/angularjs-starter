var statesMock = (function() {
    return {
        getStates: getStates
    };

    function getStates() {
        return [
            {
                state: 'dashboard',
                config: {
                    url: '/',
                    templateUrl: 'app/dashboard/dashboard.html',
                    controller: 'DashboardController',
                    controllerAs: 'vm',
                    title: 'Dashboard',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-dashboard"></i> Dashboard'
                    },
                    loginRequired: true
                }
            },
            {
                state: 'other',
                config: {
                    url: '/',
                    templateUrl: 'app/dashboard/other.html',
                    controller: 'OtherController',
                    controllerAs: 'vm',
                    title: 'Other',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-dashboard"></i> Dashboard'
                    }
                }
            }
        ];
    }
})();
