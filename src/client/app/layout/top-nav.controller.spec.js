/* jshint -W117, -W030 */
describe('TopNavController', function() {
    var controller;
    var currentRoute = 'admin';

    beforeEach(function() {
        module('app.layout');
        bard.inject('$rootScope', '$window', '$compile', '$state', 'APP_AUTH_KEY');
    });

    beforeEach(function() {
        var $scope = $rootScope.$new();
        var element = angular.element('<ht-top-nav></ht-top-nav>');
        template = $compile(element)($scope);
        $scope.$digest();
        controller = element.controller('htTopNav');
    });

    beforeEach(function() {
        // Spy local storage
        spyOn($window.localStorage, 'getItem');
        spyOn($window.localStorage, 'removeItem');

        // Spy state
        spyOn($state, 'go').and.callFake(function(state) {
            currentRoute = state;
        });
        spyOn($state, 'is').and.callFake(function(param) {
            return currentRoute === param ? 'active' : '';
        });
    });

    it('should have been created', function() {
        expect(controller).toBeDefined();
    });

    describe('isAuth', function() {
        it('should call localStorage.getItem with constant', function() {
            controller.isAuth();
            expect($window.localStorage.getItem).toHaveBeenCalledWith(APP_AUTH_KEY);
        });
    });

    describe('logout', function() {
        it('should call localStorage.removeItem with constant', function() {
            controller.logout();
            expect($window.localStorage.removeItem).toHaveBeenCalledWith(APP_AUTH_KEY);
        });
    });

    describe('isCurrent', function() {
        it('should return active if current route is correct', function() {
            $state.go(currentRoute);
            expect(controller.isCurrent(currentRoute)).toEqual('active');
        });
    });
});
