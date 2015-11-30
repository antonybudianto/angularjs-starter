/* jshint -W117 */
describe('Layout Module', function() {
    var scope;
    var element;
    var controller;
    var $state;
    var $rootScope;
    var authService;

    beforeEach(function() {
        module('app.layout');

        inject(function($injector) {
            $state = $injector.get('$state');
            authService = $injector.get('authService');
        });
    });

    describe('ht top nav directive', function() {
        beforeEach(inject(function(_$rootScope_, $compile) {
            $rootScope = _$rootScope_;
            scope = $rootScope.$new();
            element = angular
                .element('<ht-top-nav></ht-top-nav>');

            $compile(element)(scope);
            scope.$digest();

            controller = element.controller('htTopNav');
        }));

        it('should compile successfully', function() {
            expect(element).toBeDefined();
        });

        it('should call logout to authService', function() {
            spyOn(authService, 'logout');
            controller.logout();
            expect(authService.logout).toHaveBeenCalled();
        });

        describe('isCurrent', function() {
            it('should return active when route matched with current', function() {
                spyOn($state, 'is').and.returnValue(true);
                var result = controller.isCurrent('admin');
                expect(result).toEqual('active');
            });

            it('should return empty string when route matched with current', function() {
                spyOn($state, 'is').and.returnValue(false);
                var result = controller.isCurrent('admin');
                expect(result).toEqual('');
            });
        });
    });
});
