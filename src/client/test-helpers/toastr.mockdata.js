/* jshint -W117 */
var toastrMockData = (function () {
    return {
        get: get
    };

    function get() {
        return {
            error: jasmine.createSpy(),
            info: jasmine.createSpy(),
            warning: jasmine.createSpy(),
            success: jasmine.createSpy()
        };
    }
})();
