(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller('AdminController', AdminController);

    /* @ngInject */
    function AdminController(logger, peopleService, itemService, $q) {
        var vm = this;
        vm.title = 'Admin';

        activate();

        function activate() {
            var promises = [getPeople(), getItems()];
            return $q.all(promises).then(promiseDone);

            function promiseDone() {
                logger.info('Activated Admin View');
            }
        }

        function getPeople() {
            return peopleService.query(function(people) {
                vm.people = people;
            });
        }

        function getItems() {
            return itemService.query(function(items) {
                vm.items = items;
            });
        }
    }
})();
