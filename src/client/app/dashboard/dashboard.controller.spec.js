/* jshint -W117, -W030 */
describe('DashboardController', function() {
    var controller;

    beforeEach(function() {
        bard.appModule('app.dashboard');
        bard.inject('$controller', '$log', '$rootScope', '$q', '$httpBackend', 'YWEATHER_URL');
    });

    beforeEach(function () {
        $httpBackend.when('GET', YWEATHER_URL)
            .respond({query: {results: {channel: {item: {forecast: [{},{},{},{},{}]}}}}});
        controller = $controller('DashboardController');
        $rootScope.$apply();
        $httpBackend.flush();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('Dashboard controller', function() {
        it('should be created', function() {
            expect(controller).toBeDefined();
        });
        describe('after activate', function() {
            it('should have weatherStat defined', function () {
                expect(controller.weatherStat).toBeDefined();
            });
            describe('after weatherStat defined', function () {
                it('should have at least 5 forecasts', function () {
                    expect(controller.weatherStat.item.forecast.length >= 5).toEqual(true);
                });
            });

            // it('should have logged "Activated"', function() {
            //     expect($log.info.logs).to.match(/Activated/);
            // });

            // it('should have news', function () {
            //     expect(controller.news).to.not.be.empty;
            // });

            // it('should have at least 1 person', function () {
            //     expect(controller.people).to.have.length.above(0);
            // });

            // it('should have people count of 5', function () {
            //     expect(controller.people).to.have.length(7);
            // });
        });
    });
});
