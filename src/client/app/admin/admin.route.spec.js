/* jshint -W117, -W030 */
describe('admin routes', function () {
    describe('state', function () {
        var view = 'app/admin/admin.html';
        var store = {};

        beforeEach(function() {
            module('app.admin');
            bard.inject('$window', '$location', '$rootScope', '$state', '$templateCache');
            spyOn($window.localStorage, 'getItem')
                .and.callFake(function(key) {
                    return store.key;
                });
            store.user = 1;
        });

        beforeEach(function() {
            $templateCache.put(view, '');
        });

        it('should map state admin to url /admin ', function() {
            expect($state.href('admin', {})).toEqual('/admin');
        });

        it('should map /admin route to admin View template', function () {
            expect($state.get('admin').templateUrl).toEqual(view);
        });

        it('of admin should work with $state.go', function () {
            $state.go('admin');
            $rootScope.$apply();
            expect($state.is('admin'));
        });
    });
});
