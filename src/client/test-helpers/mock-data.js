/* jshint -W079 */
var mockData = (function() {
    return {
        getUsers: getUsers,
        getMockStates: getMockStates
    };

    function getUsers() {
        return [
            {
                id: 1,
                username: 'antony',
                firstName: 'Antony',
                lastName: 'Budianto',
                password: 'test'
            },
            {
                id: 2,
                username: 'budi',
                firstName:'Budi',
                lastName: 'Carolina',
                password: 'test2'
            }
        ];
    }

    function getMockStates() {
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
