/* jshint -W117 */
describe('app.core.auth - config', function() {
    var authInterceptor;
    var toastr;
    var q;
    var windowMock;

    describe('with token', function() {
        beforeEach(module('app.core.auth', function($provide) {
            toastr = toastrMockData.get();
            windowMock = {
                sessionStorage: {
                    token: 'a'
                }
            };
            $provide.value('toastr', toastr);
            $provide.value('$window', windowMock);
        }));

        beforeEach(inject(function(_authInterceptor_, $injector) {
            authInterceptor = _authInterceptor_;
            q = $injector.get('$q');
        }));

        it('should be defined', function() {
            expect(authInterceptor).toBeDefined();
        });

        describe('request', function() {
            it('should not set auth header when skipAuthorization', function () {
                var config = {
                    headers: {},
                    skipAuthorization: true
                };
                config = authInterceptor.request(config);
                expect(config.headers.Authorization).toBeUndefined();
            });

            it('should set auth header', function () {
                var config = {
                    headers: {},
                    skipAuthorization: false
                };
                config = authInterceptor.request(config);
                expect(config.headers.Authorization).toBeDefined();
            });
        });
    });

    describe('with no token', function() {
        beforeEach(module('blocks.router', function($provide) {
            toastr = {
                error: jasmine.createSpy(),
                info: jasmine.createSpy(),
                warning: jasmine.createSpy(),
                success: jasmine.createSpy()
            };
            windowMock = {
                sessionStorage: {
                    token: undefined
                }
            };
            $provide.value('toastr', toastr);
            $provide.value('$window', windowMock);
        }));

        beforeEach(module('app.core.auth'));

        beforeEach(inject(function(_authInterceptor_, $injector) {
            authInterceptor = _authInterceptor_;
            q = $injector.get('$q');
        }));

        it('should be defined', function() {
            expect(authInterceptor).toBeDefined();
        });

        describe('request', function() {
            it('should return blank headers when no headers', function () {
                var config = {
                    skipAuthorization: false
                };
                config = authInterceptor.request(config);
                expect(config.headers).toEqual({});
            });

            it('should return same config when header defined', function () {
                var config = {
                    headers: {},
                    skipAuthorization: true
                };
                config = authInterceptor.request(config);
                expect(config).toEqual(config);
            });
        });

        describe('responseError', function() {
            beforeEach(function() {
                spyOn(q, 'reject');
            });

            afterEach(function() {
                expect(q.reject).toHaveBeenCalled();
            });

            it('should toastr error when handle error 401', function () {
                var rejection = {
                    status: 401
                };
                authInterceptor.responseError(rejection);
                expect(toastr.error).toHaveBeenCalled();
            });

            it('should not toast error when handle error other than 401', function () {
                var rejection = {
                    status: 400
                };
                authInterceptor.responseError(rejection);
                expect(toastr.error).not.toHaveBeenCalled();
            });
        });
    });
});
