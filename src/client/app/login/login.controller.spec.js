/* jshint -W117, -W030 */
describe('LoginController', function() {
    var controller;

    beforeEach(function() {
        bard.appModule('app.login');
        bard.inject('$controller', '$log', '$rootScope', '$httpBackend');
    });

    beforeEach(function () {
        $httpBackend.whenPOST('/api/user/auth', {username: '', password: 'a'})
            .respond(400, 'Username is blank');
        $httpBackend.whenPOST('/api/user/auth', {username: 'a', password: ''})
            .respond(400, 'Password is blank');
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

        describe('after submit ready', function () {
            it('should fail login when username is blank', function () {
                controller.username = '';
                controller.password = 'a';
                controller.submitLogin();
                $httpBackend.expectPOST('/api/user/auth', {username: '', password: 'a'})
                    .respond(401, 'Usernaame is blank');
                $httpBackend.flush();
            });

            it('should fail login when password is blank', function () {
                controller.username = 'a';
                controller.password = '';
                controller.submitLogin();
                $httpBackend.expectPOST('/api/user/auth', {username: 'a', password: ''})
                    .respond(400, 'Password is blank');
                $httpBackend.flush();
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
