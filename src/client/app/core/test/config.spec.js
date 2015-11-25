/* jshint -W117 */
describe('app.core - config', function() {
    var logProvider;
    var routerHelperProviderObj;
    var exceptionHandler;
    beforeEach(function() {
        module('blocks.router', function(routerHelperProvider) {
            routerHelperProviderObj = routerHelperProvider;
            spyOn(routerHelperProviderObj, 'configure');
        });
        module('blocks.exception', function(_exceptionHandlerProvider_) {
            exceptionHandler = _exceptionHandlerProvider_;
            spyOn(exceptionHandler, 'configure');
        });
        module(function(_$logProvider_) {
            logProvider = _$logProvider_;
            spyOn(logProvider, 'debugEnabled');
        });
        module('app.core');
        inject();
    });

    it('should have debug enabled false', function() {
        expect(logProvider.debugEnabled).toHaveBeenCalledWith(true);
        expect(routerHelperProviderObj.configure).toHaveBeenCalled();
        expect(exceptionHandler.configure).toHaveBeenCalled();
    });
});
