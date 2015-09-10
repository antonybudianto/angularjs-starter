/* jshint -W117, -W030 */
describe('admin routes', function () {
    describe('state', function () {
        var view = 'app/login/login.html';

        beforeEach(function() {
            module('app.login', bard.fakeToastr);
            bard.inject('$location', '$rootScope', '$state', '$templateCache');
        });

        beforeEach(function() {
            $templateCache.put(view, '');
        });

        it('should map state login to url /login ', function() {
            expect($state.href('login', {})).toEqual('/login');
        });

        it('should map /login route to login View template', function () {
            expect($state.get('login').templateUrl).toEqual(view);
        });

        it('of login should work with $state.go', function () {
            $state.go('login');
            $rootScope.$apply();
            expect($state.is('login'));
        });
    });
});
