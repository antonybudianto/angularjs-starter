/* jshint -W117, -W030 */
describe('LoginController', function() {
    var controller;

    beforeEach(function() {
        bard.appModule('app.login');
        bard.inject('$controller', '$log', '$rootScope');
    });

    beforeEach(function () {
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
