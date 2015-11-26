/* jshint -W117 */
describe('router helper provider', function() {
    var toastr;
    var logger;
    var state;
    var rootScope;
    var location;
    var locationProviderObj;
    var stateProviderObj;
    var urlRouterProviderObj;
    var routerHelperProviderObj;
    var routerHelperObj;
    var configDocTitle = 'Main Doc Title';
    var mockStates = statesMock.getStates();

    beforeEach(module('blocks.router', function($provide) {
        toastr = toastrMockData.get();
        $provide.value('toastr', toastr);
    }));

    beforeEach(function() {
        module(function($locationProvider, $stateProvider,
            $urlRouterProvider, routerHelperProvider) {
            locationProviderObj = $locationProvider;
            stateProviderObj = $stateProvider;
            urlRouterProviderObj = $urlRouterProvider;
            routerHelperProviderObj = routerHelperProvider;
            routerHelperProviderObj.configure({
                docTitle: configDocTitle
            });
        });
    });

    beforeEach(inject(function(routerHelper, $injector, $rootScope) {
        routerHelperObj = routerHelper;
        rootScope = $rootScope;
        logger = $injector.get('logger');
        state = $injector.get('$state');
        location = $injector.get('$location');
    }));

    it('should call configureStates successfully', function() {
        routerHelperObj.configureStates(mockStates);
    });

    it('should call otherwise when otherwise defined', function() {
        spyOn(urlRouterProviderObj, 'otherwise');
        routerHelperObj.configureStates(mockStates, '/invalid');
        expect(urlRouterProviderObj.otherwise).toHaveBeenCalled();
    });

    it('should call $state.get when getStates', function() {
        spyOn(state, 'get');
        routerHelperObj.getStates();
        expect(state.get).toHaveBeenCalled();
    });

    it('should set title in $rootScope', function() {
        var title = 'Hello';
        var expectedTitle = configDocTitle + ' ' + title;
        rootScope.$emit('$stateChangeSuccess', {
            title: title
        });
        expect(rootScope.title).toBeDefined();
        expect(rootScope.title).toEqual(expectedTitle);
    });

    it('should handle when no title in state', function() {
        var expectedTitle = configDocTitle + ' ';
        rootScope.$emit('$stateChangeSuccess', {});
        expect(rootScope.title).toBeDefined();
        expect(rootScope.title).toEqual(expectedTitle);
    });

    describe('handleStateChangeError', function() {
        beforeEach(function() {
            spyOn(location, 'path');
        });

        it('should log error for 1st time', function () {
            spyOn(logger, 'error');
            var error = {
                data: 'Error',
                statusText: 'Error text',
                status: 'Error'
            };
            routerHelperObj.handleStateChangeError('event', 'state', 'top',
                'fromstate', 'fromparam', error);
            expect(logger.error).toHaveBeenCalled();
            expect(location.path).toHaveBeenCalledWith('/');
        });

        it('should log error once when handleError twice', function() {
            spyOn(logger, 'error');
            var error = {
                data: 'Error',
                statusText: 'Error text',
                status: 'Error'
            };
            routerHelperObj.handleStateChangeError('event', 'state', 'top',
                'fromstate', 'fromparam', error);
            routerHelperObj.handleStateChangeError('event', 'state', 'top',
                'fromstate', 'fromparam', error);
            expect(logger.error.calls.count()).toEqual(1);
            expect(location.path).toHaveBeenCalledWith('/');
        });

        it('should handle when no error data', function() {
            spyOn(logger, 'error');
            var error = {
                statusText: 'Error text',
                status: 'Error'
            };
            routerHelperObj.handleStateChangeError('event', 'state', 'top',
                'fromstate', 'fromparam', error);
            expect(logger.error).toHaveBeenCalled();
            expect(location.path).toHaveBeenCalledWith('/');
        });

        it('should handle when no statustext', function() {
            spyOn(logger, 'error');
            var error = {
                data: 'Error',
                status: 'Error'
            };
            routerHelperObj.handleStateChangeError('event', 'state', 'top',
                'fromstate', 'fromparam', error);
            expect(logger.error).toHaveBeenCalled();
            expect(location.path).toHaveBeenCalledWith('/');
        });

        it('should handle when no status', function() {
            spyOn(logger, 'error');
            var error = {
                data: 'Error',
                statusText: 'Error text'
            };
            routerHelperObj.handleStateChangeError('event', 'state', 'top',
                'fromstate', 'fromparam', error);
            expect(logger.error).toHaveBeenCalled();
            expect(location.path).toHaveBeenCalledWith('/');
        });
    });
});
