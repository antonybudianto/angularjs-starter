/* jshint -W117, -W030 */
describe('AdminController', function() {
    var controller;
    var peopleDummies = peopleMock.getDummies();
    var itemDummies = itemMock.getDummies();

    beforeEach(function() {
        bard.appModule('app.admin');
        bard.inject('$controller', '$log', '$rootScope', '$httpBackend');
    });

    beforeEach(function () {
        controller = $controller('AdminController');
        $httpBackend.whenGET('/api/people').respond(200, peopleDummies);
        $httpBackend.whenGET('/api/item').respond(200, itemDummies);
        $rootScope.$apply();
        $httpBackend.flush();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('Admin controller', function() {
        it('should be created successfully', function () {
            expect(controller).toBeDefined();
        });

        describe('after activate', function() {
            it('should have same dummy people', function() {
                expect(controller.people.length === peopleDummies.length).toBeTruthy();
            });

            it('should have same dummy items', function() {
                expect(controller.items.length === itemDummies.length).toBeTruthy();
            });

            it('should have title of Admin', function() {
                expect(controller.title).toEqual('Admin');
            });

            it('should have logged "Activated"', function() {
                expect($log.info.logs).toMatch(/Activated/);
            });
        });
    });
});
