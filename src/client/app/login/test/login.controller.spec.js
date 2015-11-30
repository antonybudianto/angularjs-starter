/* jshint -W117 */
describe('app.login - login controller', function() {
    var controller;
    var scope;
    var state;
    var logger;
    var authService;
    var stateParams;
    var q;

    beforeEach(module('app.login'));

    function resolvePromise(data) {
        return q.when(data || {});
    }

    function rejectPromise(reason) {
        return q.reject(reason || {});
    }

    function mockDependencies($injector, $rootScope, message) {
        scope = $rootScope.$new();
        q = $injector.get('$q');
        state = $injector.get('$state');
        stateParams = $injector.get('$stateParams');
        authService = $injector.get('authService');
        logger = jasmine.createSpyObj('logger', ['error', 'info']);
        stateParams.message = message;
    }

    function mockController($controller) {
        controller = $controller(
            'LoginController',
            {
                $scope: scope,
                $state: state,
                $stateParams: stateParams,
                logger: logger,
                authService: authService
            }
        );
    }

    describe('without message', function() {
        beforeEach(inject(function($injector, $controller, $rootScope) {
            mockDependencies($injector, $rootScope);
            mockController($controller);
        }));

        it('should be defined', function() {
            expect(controller).toBeDefined();
        });
    });

    describe('with message', function() {
        beforeEach(inject(function($injector, $controller, $rootScope) {
            mockDependencies($injector, $rootScope, 'Message');
            mockController($controller);
        }));

        it('should be defined', function() {
            expect(controller).toBeDefined();
        });

        describe('submitReady', function () {
            it('should return false when username or password is blank', function() {
                controller.password = '';
                controller.username = 'a';
                expect(controller.submitReady()).toBeFalsy();
            });

            it('should return true when username or password is not blank', function() {
                controller.password = 'a';
                controller.username = 'a';
                expect(controller.submitReady()).toBeTruthy();
            });
        });

        describe('submitLogin', function() {
            it('should log info when login success', function() {
                spyOn(authService, 'authenticate').and.callFake(resolvePromise);
                spyOn(state, 'go').and.callFake(function() {});
                controller.username = 'a';
                controller.password = 'b';
                controller.submitLogin();
                scope.$apply();
                expect(logger.info).toHaveBeenCalled();
                expect(state.go).toHaveBeenCalledWith('dashboard');
            });

            it('should log error when login failed', function() {
                spyOn(authService, 'authenticate').and.callFake(rejectPromise);
                controller.username = 'a';
                controller.password = 'b';
                controller.submitLogin();
                scope.$apply();
                expect(logger.error).toHaveBeenCalled();
            });
        });
    });
});
