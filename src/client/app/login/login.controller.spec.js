/* jshint -W117, -W030 */
describe('LoginController', function() {
    var controller, authHandler;
    var bypassUsername = 'dummyUsername';
    var bypassPassword = 'supersecret';

    beforeEach(function() {
        bard.appModule('app.login');
        bard.inject('$controller', '$log', '$rootScope', '$httpBackend');
    });

    beforeEach(function () {
        authHandler = $httpBackend.whenPOST('/api/user/auth')
            .respond(function(method, url, data, header) {
                data = JSON.parse(data);
                if (data.username === '') {
                    return [400, {description: 'Username is blank'}];
                } else if (data.password === '') {
                    return [400, {description: 'Password is blank'}];
                } else if (data.username === bypassUsername &&
                    data.password === bypassPassword) {
                    return [200, {description: 'Login success'}];
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
            expect(controller).to.be.defined;
        });

        it('should have a blank username and password', function () {
            expect(controller.username).to.equal('');
            expect(controller.password).to.equal('');
        });

        it('should not ready to submit login when username/password is blank', function () {
            controller.username = '';
            controller.password = 'a';
            expect(controller.submitReady()).to.equal(false);
            controller.username = 'a';
            controller.password = '';
            expect(controller.submitReady()).to.equal(false);
            controller.username = '';
            controller.password = '';
            expect(controller.submitReady()).to.equal(false);
        });

        it('should be ready to submit login when inputs aren\'t blank', function () {
            controller.username = 'something';
            controller.password = 'anything';
            expect(controller.submitReady()).to.equal(true);
        });

        describe('after submit ready and do submit: it', function () {
            it('should fail login when username is blank', function () {
                controller.username = '';
                controller.password = 'a';
                controller.submitLogin();
                $httpBackend.expectPOST('/api/user/auth');
                $httpBackend.flush();
                expect(controller.login.status === 400 &&
                    controller.login.description === 'Username is blank').to.equal(true);
            });

            it('should fail login when password is blank', function () {
                controller.username = 'a';
                controller.password = '';
                controller.submitLogin();
                $httpBackend.flush();
                expect(controller.login.status === 400 &&
                    controller.login.description === 'Password is blank').to.equal(true);
            });

            it('should fail login when credentials are wrong', function () {
                controller.username = 'a';
                controller.password = 'b';
                controller.submitLogin();
                $httpBackend.flush();
                expect(controller.login.status === 400 &&
                    controller.login.description === 'Wrong credentials').to.equal(true);
            });

            it('should succeeded login when credentials are right', function () {
                controller.username = bypassUsername;
                controller.password = bypassPassword;
                controller.submitLogin();
                $httpBackend.flush();
                expect(controller.login.status === 200 &&
                    controller.login.description === 'Login success').to.equal(true);
            });
        });

        // describe('after activate', function() {
        //     it('should have title of Admin', function() {
        //         expect(controller.title).to.equal('Admin');
        //     });

        //     it('should have logged "Activated"', function() {
        //         expect($log.info.logs).to.match(/Activated/);
        //     });
        // });
    });
});
