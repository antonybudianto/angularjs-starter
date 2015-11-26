/* jshint -W117 */
describe('app.core.auth - run', function() {
    var state;
    var toastr;
    var authService;
    var rootScope;

    beforeEach(function () {
        module('app.core.auth', function($provide) {
            toastr = toastrMockData.get();
            $provide.value('toastr', toastr);
        });

        inject(function($injector) {
            rootScope = $injector.get('$rootScope');
            state = $injector.get('$state');
            authService = $injector.get('authService');
        });
    });

    it('should be defined', function() {
        expect(authService).toBeDefined();
    });

    describe('stateChangeStart', function() {
        it('should go to afterLogin after success login', function() {
            spyOn(authService, 'isAuth').and.returnValue(true);
            spyOn(state, 'go');
            rootScope.$emit('$stateChangeStart', {},
            {
                afterLogin: 'dashboard'
            });
            expect(state.go).toHaveBeenCalledWith('dashboard');
        });

        it('should not go to afterLogin if not defined', function() {
            spyOn(authService, 'isAuth').and.returnValue(true);
            spyOn(state, 'go');
            rootScope.$emit('$stateChangeStart', {}, {});
            expect(state.go).not.toHaveBeenCalled();
        });

        describe('loginRequired true', function () {
            it('should not go to login if already login', function () {
                spyOn(authService, 'isAuth').and.returnValue(true);
                spyOn(state, 'go');
                rootScope.$emit('$stateChangeStart', {
                    loginRequired: true
                }, {});
                expect(state.go).not.toHaveBeenCalled();
            });

            it('should go to login if not login', function () {
                spyOn(authService, 'isAuth').and.returnValue(false);
                spyOn(state, 'go');
                rootScope.$emit('$stateChangeStart', {
                    loginRequired: true
                }, {});
                expect(state.go).toHaveBeenCalled();
            });
        });
    });
});
