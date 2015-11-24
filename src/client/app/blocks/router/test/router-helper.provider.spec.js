/* jshint -W117 */
describe('router helper provider', function() {
    var toastr;
    var logger;
    var state;
    var rootScope;
    var locationProviderObj;
    var stateProviderObj;
    var urlRouterProviderObj;
    var routerHelperProviderObj;
    var routerHelperObj;
    var mockStates = [
        {
            state: 'dashboard',
            config: {
                url: '/',
                templateUrl: 'app/dashboard/dashboard.html',
                controller: 'DashboardController',
                controllerAs: 'vm',
                title: 'Dashboard',
                settings: {
                    nav: 1,
                    content: '<i class="fa fa-dashboard"></i> Dashboard'
                },
                loginRequired: true
            }
        },
        {
            state: 'other',
            config: {
                url: '/',
                templateUrl: 'app/dashboard/other.html',
                controller: 'OtherController',
                controllerAs: 'vm',
                title: 'Other',
                settings: {
                    nav: 2,
                    content: '<i class="fa fa-dashboard"></i> Dashboard'
                }
            }
        }
    ];

    beforeEach(module('blocks.router', function($provide) {
        toastr = {
            error: jasmine.createSpy(),
            info: jasmine.createSpy(),
            warning: jasmine.createSpy(),
            success: jasmine.createSpy()
        };
        $provide.value('toastr', toastr);
    }));

    beforeEach(function() {
        module(function($locationProvider, $stateProvider,
            $urlRouterProvider, routerHelperProvider) {
            locationProviderObj = $locationProvider;
            stateProviderObj = $stateProvider;
            urlRouterProviderObj = $urlRouterProvider;
            routerHelperProviderObj = routerHelperProvider;
            routerHelperProviderObj.configure({});
        });
    });

    beforeEach(inject(function(routerHelper, $injector, $rootScope) {
        routerHelperObj = routerHelper;
        rootScope = $rootScope;
        logger = $injector.get('logger');
        state = $injector.get('$state');
    }));

    it('should call configureStates successfully', function() {
        routerHelperObj.configureStates(mockStates);
    });

    it('should call otherwise when otherwise defined', function() {
        spyOn(urlRouterProviderObj, 'otherwise');
        routerHelperObj.configureStates(mockStates, '/invalid');
        expect(urlRouterProviderObj.otherwise).toHaveBeenCalled();
    });

    describe('handleStateChangeError', function() {
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
        });

        it('should call $state.get when getStates', function() {
            spyOn(state, 'get');
            routerHelperObj.getStates();
            expect(state.get).toHaveBeenCalled();
        });

        it('should ca', function() {
            rootScope.$emit('$stateChangeSuccess', {
                toState: {
                    title: 'a'
                }
            });
        });
    });
});
