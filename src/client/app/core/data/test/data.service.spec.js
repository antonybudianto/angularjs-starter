/* jshint -W117 */
describe('app.core.data - service', function() {
    var dataService;

    beforeEach(function () {
        module('app.core.data');

        inject(function ($injector) {
            dataService = $injector.get('dataService');
        });
    });

    it('should be defined', function () {
        expect(dataService).toBeDefined();
    });
});
