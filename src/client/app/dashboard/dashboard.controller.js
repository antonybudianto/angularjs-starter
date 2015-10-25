(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    /* @ngInject */
    function DashboardController($q, logger, weatherService) {
        var vm = this;
        vm.news = [
            {
                type: 'success',
                msg: 'Well done! You successfully read this important alert message.'
            }
        ];
        vm.closeAlert = closeAlert;

        activate();

        function activate() {
            logger.info('Activated Dashboard View');
        }

        function closeAlert (index) {
            vm.news.splice(index, 1);
        }
    }
})();
