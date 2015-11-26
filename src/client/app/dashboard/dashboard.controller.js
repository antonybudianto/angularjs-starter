(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    /* @ngInject */
    function DashboardController(logger, authService, $q) {
        var vm = this;
        vm.closeAlert = closeAlert;

        activate();

        function activate() {
            vm.user = authService.getUser();
            vm.news = [
                {
                    type: 'success',
                    msg: 'Well done! You successfully read this important alert message.'
                }
            ];
            logger.info('Activated Dashboard View', null, 'Info');
        }

        function closeAlert (index) {
            vm.news.splice(index, 1);
        }
    }
})();
