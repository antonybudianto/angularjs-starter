/* jshint -W117, -W030 */
describe('router helper provider', function () {
    describe('getStates', function() {
        beforeEach(function() {
            module('app.admin');
            bard.inject('$window', 'routerHelper', '$rootScope', '$state', '$log');
        });

        it('should not be empty', function() {
            var states = routerHelper.getStates();
            expect(states.length >= 1).toBeTruthy();
        });

        it('should logs unknown target when state is not defined', function() {
            routerHelper.handleStateChangeError(null, {}, {}, {}, {}, 'Try error');
            expect($log.error.logs).toMatch(/unknown target/);
        });

        it('should not handle error twice', function() {
            // First try
            routerHelper.handleStateChangeError(null, {}, {}, {}, {}, 'Try error');
            expect($log.error.logs).toMatch(/unknown target/);

            // Second try
            var mock = {
                title: 'Wonderland'
            };
            routerHelper.handleStateChangeError(null, mock, {}, {}, {}, 'Try again');

            // Test will fail if it logs 'Wonderland'
            expect($log.error.logs).not.toMatch(/Wonderland/);
            // will success if it logs the previous one.
            expect($log.error.logs).toMatch(/unknown target/);
        });
    });
});
