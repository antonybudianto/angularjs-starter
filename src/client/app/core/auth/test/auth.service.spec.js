/* jshint -W117 */
describe('app.core.auth - service', function() {
    var authService;
    var toastrMock;
    var windowMock;
    var stateMock;
    var q;
    var httpBackend;
    var jwtHelper;
    var tokenMock = 'some-jwt-token';
    var payloadMock = {
        id: '01',
        username: 'test',
        firstName: 'test',
        lastName: 'test'
    };

    function mockData () {
        toastr = toastrMockData.get();
        stateMock = jasmine.createSpyObj('stateMock', ['go']);
        windowMock = {
            sessionStorage: {
                token: tokenMock
            }
        };
    }

    beforeEach(function() {
        module('app.core.auth', function($provide) {
            mockData();
            $provide.value('toastr', toastrMock);
            $provide.value('$state', stateMock);
            $provide.value('$window', windowMock);
        });

        inject(function ($injector) {
            q = $injector.get('$q');
            jwtHelper = $injector.get('jwtHelper');
            authService = $injector.get('authService');
            httpBackend = $injector.get('$httpBackend');
        });
    });

    it('should be defined', function() {
        expect(authService).toBeDefined();
    });

    it('should remove token in storage and go to login when logout', function() {
        stateMock.go.and.callFake(function (to) {
            expect(to).toEqual('login');
        });
        authService.logout();
        expect(windowMock.sessionStorage.token).toBeUndefined();
        expect(stateMock.go).toHaveBeenCalled();
    });

    it('should return token correctly', function() {
        var token = authService.getToken();
        expect(token).toEqual(tokenMock);
    });

    describe('authenticate', function() {
        afterEach(function () {
            httpBackend.verifyNoOutstandingExpectation();
        });

        it('should resolve and set token when success', function() {
            spyOn(q, 'resolve');
            var token = 'new-token';
            httpBackend
                .expectPOST('/api/auth')
                .respond(200, {
                    token: token
                });

            authService.authenticate('antony', 'secret');
            httpBackend.flush();
            expect(windowMock.sessionStorage.token).toEqual(token);
            expect(q.resolve).toHaveBeenCalledWith(token);
        });

        it('should reject when error', function() {
            var errorCode = 500;
            httpBackend
                .expectPOST('/api/auth')
                .respond(errorCode, {});
            authService.authenticate('antony', 'secret')
                .then(null, function (err) {
                    expect(err.status).toEqual(errorCode);
                });
            httpBackend.flush();
        });
    });

    describe('getUser', function() {
        it('should return null if not auth', function() {
            spyOn(jwtHelper, 'isTokenExpired').and.returnValue(true);
            var user = authService.getUser();
            expect(user).toBeNull();
        });

        it('should return payload if auth', function() {
            spyOn(jwtHelper, 'isTokenExpired').and.returnValue(false);
            spyOn(jwtHelper, 'decodeToken').and.returnValue(payloadMock);
            var user = authService.getUser();
            expect(user).toBe(payloadMock);
        });
    });
});
