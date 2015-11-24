/* jshint -W117 */
describe('blocks.exception', function() {
    beforeEach(module('blocks.exception', function($provide) {
        toastr = {
            error: jasmine.createSpy(),
            info: jasmine.createSpy(),
            warning: jasmine.createSpy(),
            success: jasmine.createSpy()
        };
        $provide.value('toastr', toastr);
    }));

    var exception;
    var logger;

    beforeEach(inject(function(_exception_, _logger_) {
        exception = _exception_;
        logger = _logger_;
    }));

    it('should be defined', function() {
        expect(exception).toBeDefined();
    });

    it('should log error when call catcher', function() {
        spyOn(logger, 'error');
        exception.catcher('You got error')('some error');
        expect(logger.error).toHaveBeenCalled();
    });
});
