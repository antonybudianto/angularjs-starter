/* jshint -W117 */
describe('blocks.exception', function() {
    beforeEach(module('blocks.exception', function($provide) {
        toastr = toastrMockData.get();
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
        spyOn(logger, 'log');
        exception.catcher('You got error')('some error');
        expect(logger.log).toHaveBeenCalled();
    });
});
