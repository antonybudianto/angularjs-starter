/* jshint -W117, -W030 */
describe('LoginController', function() {
    var controller, authHandler, afterLoginState;

    // Fake rights credentials
    var bypassId = '123';
    var bypassUsername = 'dummyUsername';
    var bypassPassword = 'supersecret';
    var expectedState = 'dashboard';

    beforeEach(function() {
        bard.appModule('app.login');
        bard.inject('$controller', '$log', '$rootScope', '$httpBackend', '$state');
        $state.go = function(state) {
            afterLoginState = state;
        };
    });

    beforeEach(function () {
        // Fake back-end definition to test login
        authHandler = $httpBackend.whenPOST('/api/user/auth')
            .respond(function(method, url, data, header) {
                data = JSON.parse(data);
                if (data.username === '') {
                    return [400, {description: 'Username is blank'}];
                } else if (data.password === '') {
                    return [400, {}];
                } else if (data.username === bypassUsername &&
                    data.password === bypassPassword) {
                    return [200, {description: 'Login success', user: {id: bypassId}}];
                } else {
                    return [400, {description: 'Wrong credentials'}];
                }
            });
        controller = $controller('LoginController');
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('Login controller', function() {
        it('should be created successfully', function () {
            expect(controller).toBeDefined();
        });

        it('should have a blank username and password', function () {
            expect(controller.username).toEqual('');
            expect(controller.password).toEqual('');
        });

        it('should not ready to submit login when username/password is blank', function () {
            controller.username = '';
            controller.password = 'a';
            expect(controller.submitReady()).toBeFalsy();
            controller.username = 'a';
            controller.password = '';
            expect(controller.submitReady()).toBeFalsy();
            controller.username = '';
            controller.password = '';
            expect(controller.submitReady()).toBeFalsy();
        });

        it('should be ready to submit login when inputs aren\'t blank', function () {
            controller.username = 'something';
            controller.password = 'anything';
            expect(controller.submitReady()).toBeTruthy();
        });

        describe('after submit ready and do submit,', function () {
            it('should fail login when username is blank', function () {
                controller.username = '';
                controller.password = 'a';
                controller.submitLogin();
                $httpBackend.flush();
                expect(controller.login.status === 400).toBeTruthy();
                expect(controller.login.description).toEqual('Login failed\nUsername is blank');
            });

            it('should fail login when password is blank', function () {
                controller.username = 'a';
                controller.password = '';
                controller.submitLogin();
                $httpBackend.flush();
                expect(controller.login.status === 400).toBeTruthy();
            });

            it('should fail login when credentials are wrong', function () {
                controller.username = 'a';
                controller.password = 'b';
                controller.submitLogin();
                $httpBackend.flush();
                expect(controller.login.status === 400).toBeTruthy();
                expect(controller.login.description).toEqual('Login failed\nWrong credentials');
            });

            it('should succeeded login when credentials are right', function () {
                controller.username = bypassUsername;
                controller.password = bypassPassword;
                controller.submitLogin();
                $httpBackend.flush();
                expect(controller.login.status === 200).toBeTruthy();
                expect(controller.login.description).toEqual('Login success');
            });

            describe('after login', function() {
                it('should redirect to ' + expectedState, function() {
                    expect(afterLoginState).toEqual(expectedState);
                    afterLoginState = null;
                });
            });
        });

        // describe('after activate', function() {
        //     it('should have title of Admin', function() {
        //         expect(controller.title).toEqual('Admin');
        //     });

        //     it('should have logged "Activated"', function() {
        //         expect($log.info.logs).to.match(/Activated/);
        //     });
        // });
    });
});
