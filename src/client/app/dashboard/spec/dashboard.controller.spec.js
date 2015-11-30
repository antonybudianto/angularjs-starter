/* jshint -W117 */
describe('Dashboard Module - Dashboard Controller', function() {
    var controller;
    var scope;
    var logger;
    var authService;
    var $q;

    function mockDependencies($injector, $rootScope) {
        scope = $rootScope.$new();
        $q = $injector.get('$q');
        logger = $injector.get('logger');
        authService = $injector.get('authService');
    }

    function mockController($controller) {
        spyOn(authService, 'getUser').and.returnValue(mockData.getUsers()[0]);
        spyOn(logger, 'info');

        controller = $controller(
            'DashboardController',
            {
                $q: $q,
                $scope: scope,
                logger: logger,
                authService: authService
            }
        );
        scope.$apply();
    }

    beforeEach(function() {
        module('app.core.auth', function ($provide) {
            authService = {
                isAuth: function() {
                    return true;
                },
                getUser: function() {
                    return {};
                }
            };
            $provide.value('authService', authService);
        });

        module('app.dashboard');
        inject(function($injector, $controller, $rootScope) {
            mockDependencies($injector, $rootScope);
            mockController($controller);
        });
    });

    it('should be defined', function() {
        expect(controller).toBeDefined();
        expect(logger.info).toHaveBeenCalled();
    });

    it('should remove alert successfully', function() {
        controller.news = [{}, {}];
        controller.closeAlert(0);
        expect(controller.news.length).toEqual(1);
    });
});
