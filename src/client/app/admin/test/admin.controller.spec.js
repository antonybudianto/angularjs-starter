/* jshint -W117 */
describe('Admin Module - Admin Controller', function() {
    var controller;
    var scope;
    var logger;
    var dataService;
    var $q;

    function mockDependencies($injector, $rootScope) {
        scope = $rootScope.$new();
        $q = $injector.get('$q');
        logger = $injector.get('logger');
        dataService = $injector.get('dataService');
    }

    function mockController($controller) {
        spyOn(dataService, 'get').and.callFake(function() {
            return $q.when([{},{}]);
        });
        spyOn(logger, 'info');

        controller = $controller(
            'AdminController',
            {
                $q: $q,
                $scope: scope,
                logger: logger,
                dataService: dataService
            }
        );
        scope.$apply();
    }

    beforeEach(function() {
        module('app.admin');
        inject(function($injector, $controller, $rootScope) {
            mockDependencies($injector, $rootScope);
            mockController($controller);
        });
    });

    it('should be defined', function() {
        expect(controller).toBeDefined();
        expect(logger.info).toHaveBeenCalled();
    });
});
