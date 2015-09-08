/* jshint -W117, -W030 */
describe('AdminController', function() {
    var controller;

    beforeEach(function() {
        bard.appModule('app.admin');
        bard.inject('$controller', '$log', '$rootScope');
    });

    beforeEach(function () {
        controller = $controller('AdminController');
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('Admin controller', function() {
        it('should be created successfully', function () {
            expect(controller).toBeDefined();
        });

        describe('after activate', function() {
            it('should have title of Admin', function() {
                expect(controller.title).toEqual('Admin');
            });

            it('should have logged "Activated"', function() {
                expect($log.info.logs).toMatch(/Activated/);
            });
        });
    });
});
