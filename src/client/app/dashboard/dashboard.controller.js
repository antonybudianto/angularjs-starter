(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    /* @ngInject */
    function DashboardController(logger, authService, weatherService, $q) {
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
            loadData();
        }

        function loadData () {
            var promises = [getWeather()];
            $q.all(promises).then(promiseDone);

            function promiseDone (data) {
                logger.info('Activated Dashboard View', null, 'Info');
            }
        }

        function closeAlert (index) {
            vm.news.splice(index, 1);
        }

        function getWeather () {
            return weatherService.getWeather().then(resolve, reject);

            function resolve (data) {
                vm.weatherStat = data.query.results.channel;
            }

            function reject (e) {
                logger.error('Error load weather', e, 'Error');
            }
        }
    }
})();
