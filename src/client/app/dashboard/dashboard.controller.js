(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    /* @ngInject */
    function DashboardController(logger, authService) {
        var vm = this;
        vm.closeAlert = closeAlert;

        activate();

        function activate() {
            vm.news = [
                {
                    type: 'success',
                    msg: 'Well done! You successfully read this important alert message.'
                }
            ];
            vm.user = authService.getUser();
            logger.info('Activated Dashboard View');
        }

        function closeAlert (index) {
            vm.news.splice(index, 1);
        }
    }
})();
