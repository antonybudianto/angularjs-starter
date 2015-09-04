(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    //DashboardController.$inject = ['$q', 'dataservice', 'logger'];
    /* @ngInject */
    function DashboardController($q, dataservice, logger) {
        var vm = this;
        vm.news = [
            {
                type: 'success',
                msg: 'Well done! You successfully read this important alert message.'
            }
        ];
        vm.closeAlert = closeAlert;
        vm.title = 'Dashboard';

        activate();

        function activate() {
            var promises = [getWeatherStat()];
            return $q.all(promises).then(function(data) {
                logger.info('Activated Dashboard View');
            });
        }

        function closeAlert (index) {
            vm.news.splice(index, 1);
        }

        function getWeatherStat() {
            return dataservice.getWeatherStat().then(function (data) {
                vm.weatherStat = data.query.results.channel;
                return vm.weatherStat;
            });
        }
    }
})();
