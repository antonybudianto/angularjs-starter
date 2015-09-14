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
            var peoplePromise = peopleService.query(function(people) {
                vm.people = people;
            }).$promise;
            var itemPromise = itemService.query(function(items) {
                vm.items = items;
            }).$promise;
            var promises = [peoplePromise, itemPromise];
            return $q.all(promises).then(promiseDone);

            function promiseDone(data) {
                logger.info('Activated Admin View');
            }
        }
    }
})();
