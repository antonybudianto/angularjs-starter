/* jshint -W117, -W030 */
describe('blocks.exception', function() {
    var exceptionHandlerProvider;
    var mocks = {
        errorMessage: 'fake error',
        prefix: '[TEST]: '
    };

    beforeEach(function() {
        bard.appModule('blocks.exception', function(_exceptionHandlerProvider_) {
            exceptionHandlerProvider = _exceptionHandlerProvider_;
        });
        bard.inject('$rootScope');
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('exceptionHandlerProvider', function() {
        it('should have a dummy test', inject(function() {
            expect(true).toEqual(true);
        }));

        it('should have exceptionHandlerProvider defined', inject(function() {
            expect(exceptionHandlerProvider).toBeDefined();
        }));

        it('should have configuration', inject(function() {
            expect(exceptionHandlerProvider.config).toBeDefined();
        }));

        it('should have configuration', inject(function() {
            expect(exceptionHandlerProvider.configure).toBeDefined();
        }));

        describe('with appErrorPrefix', function() {
            beforeEach(function() {
                exceptionHandlerProvider.configure(mocks.prefix);
            });

            it('should have appErrorPrefix defined', inject(function() {
                expect(exceptionHandlerProvider.$get().config.appErrorPrefix).toBeDefined();
            }));

            it('should have appErrorPrefix set properly', inject(function() {
                expect(exceptionHandlerProvider.$get().config.appErrorPrefix)
                    .toEqual(mocks.prefix);
            }));

            it('should throw an error when forced', inject(function() {
                expect(functionThatWillThrow).toThrow();
            }));

            it('manual error is handled by decorator', function() {
                var exception;
                exceptionHandlerProvider.configure(mocks.prefix);
                try {
                    $rootScope.$apply(functionThatWillThrow);
                }
                catch (ex) {
                    exception = ex;
                    expect(ex.message).toEqual(mocks.prefix + mocks.errorMessage);
                }
            });
        });
    });

    function functionThatWillThrow() {
        throw new Error(mocks.errorMessage);
    }
});
