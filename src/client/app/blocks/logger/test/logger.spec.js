/* jshint -W117 */
describe('blocks.logger', function () {
    var logger;
    var $log;
    var toastr;

    beforeEach(module('blocks.logger', function($provide) {
        toastr = toastrMockData.get();

        $log = {
            error: jasmine.createSpy(),
            info: jasmine.createSpy(),
            warn: jasmine.createSpy(),
            log: jasmine.createSpy()
        };

        $provide.value('toastr', toastr);
        $provide.value('$log', $log);
    }));

    beforeEach(inject(
        function(_logger_) {
            logger = _logger_;
        }
    ));

    it('should call toastr and $log info correctly', function() {
        var message = 'Hello';
        var data = null;
        var title = 'Info';
        logger.info(message, data, title);
        expect(toastr.info).toHaveBeenCalledWith(message, title);
        expect($log.info).toHaveBeenCalledWith(title + ': ' + message, data);
    });

    it('should call toastr and $log success correctly', function() {
        var message = 'Hello';
        var data = null;
        var title = 'Success';
        logger.success(message, data, title);
        expect(toastr.success).toHaveBeenCalledWith(message, title);
        expect($log.info).toHaveBeenCalledWith(title + ': ' + message, data);
    });

    it('should call toastr and $log error correctly', function() {
        var message = 'Hello';
        var data = null;
        var title = 'Error';
        logger.error(message, data, title);
        expect(toastr.error).toHaveBeenCalledWith(message, title);
        expect($log.error).toHaveBeenCalledWith(title + ': ' + message, data);
    });

    it('should call toastr and $log warning correctly', function() {
        var message = 'Hello';
        var data = null;
        var title = 'Warning';
        logger.warning(message, data, title);
        expect(toastr.warning).toHaveBeenCalledWith(message, title);
        expect($log.warn).toHaveBeenCalledWith(title + ': ' + message, data);
    });
});
