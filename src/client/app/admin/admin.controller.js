(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller('AdminController', AdminController);

    /* @ngInject */
    function AdminController($q, logger, dataService) {
        var vm = this;
        var endpoints = dataService.endpoints;

        activate();

        function activate() {
            var promises = [getPeople(), getItems()];
            return $q.all(promises).then(promiseDone);

            function promiseDone() {
                logger.info('Activated Admin View', null, 'Info');
            }
        }

        function getPeople() {
            return dataService.get(endpoints.PEOPLE)
                .then(function(result) {
                    vm.people = result;
                });
        }

        function getItems() {
            return dataService.get(endpoints.ITEM)
                .then(function(result) {
                    vm.items = result;
                });
        }
    }
})();
