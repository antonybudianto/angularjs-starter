/* jshint -W117 */
describe('blocks.exception', function() {
    var _exceptionHandlerProvider;
    var rootScope;
    var logger;
    var mocks = {
        errorMessage: 'fake error',
        prefix: '[TEST]: '
    };

    beforeEach(module('blocks.exception', function($provide, exceptionHandlerProvider) {
        _exceptionHandlerProvider = exceptionHandlerProvider;
        $provide.constant('toastr', toastr);
    }));

    describe('ExceptionHandlerProvider with no custom config', function() {
        beforeEach(inject(function($rootScope) {
            rootScope = $rootScope;
            _exceptionHandlerProvider.configure();
        }));

        it('should be defined', function() {
            expect(_exceptionHandlerProvider).toBeDefined();
        });

        it('should have appErrorPrefix undefined', function() {
            expect(_exceptionHandlerProvider.$get().config.appErrorPrefix).toBeUndefined();
        });

        it('should throw an error when forced', function() {
            expect(functionThatWillThrow).toThrow();
        });

        it('manual error is handled by decorator', function() {
            var exception;
            try {
                rootScope.$apply(functionThatWillThrow);
            }
            catch (ex) {
                exception = ex;
            }
        });
    });

    describe('ExceptionHandlerProvider', function() {
        beforeEach(inject(function($rootScope, $injector) {
            rootScope = $rootScope;
            logger = $injector.get('logger');
            spyOn(logger, 'error');
            _exceptionHandlerProvider.configure(mocks.prefix);
        }));

        it('should be defined', function() {
            expect(_exceptionHandlerProvider).toBeDefined();
        });

        it('should have appErrorPrefix defined', function() {
            expect(_exceptionHandlerProvider.$get().config.appErrorPrefix).toBeDefined();
        });

        it('should have appErrorPrefix set properly', function() {
            expect(_exceptionHandlerProvider.$get().config.appErrorPrefix).toEqual(mocks.prefix);
        });

        it('should throw an error when forced', function() {
            expect(functionThatWillThrow).toThrow();
        });

        it('manual error is handled by decorator', function() {
            var exception;
            try {
                rootScope.$apply(functionThatWillThrow);
            }
            catch (ex) {
                exception = ex;
                expect(exception.message).toEqual(mocks.prefix + mocks.errorMessage);
                expect(logger.error).toHaveBeenCalled();
            }
        });
    });

    function functionThatWillThrow() {
        throw new Error(mocks.errorMessage);
    }
});
