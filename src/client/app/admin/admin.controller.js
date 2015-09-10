(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller('AdminController', AdminController);

    //AdminController.$inject = ['logger'];
    /* @ngInject */
    function AdminController(logger, $state) {
        var vm = this;
        vm.title = 'Admin';

        activate();

        function activate() {
            logger.info('Activated Admin View');
        }
    }
})();
