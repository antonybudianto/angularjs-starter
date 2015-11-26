/* jshint -W117 */
describe('app.core.data - service', function() {
    var dataService;
    var constant;
    var httpBackend;
    var apiRoot;
    var exception;

    beforeEach(function () {
        module('app.core.data');

        inject(function ($injector) {
            dataService = $injector.get('dataService');
            constant = $injector.get('constant');
            httpBackend = $injector.get('$httpBackend');
            apiRoot = constant.API_HOST + '/api/';
            exception = $injector.get('exception');
            spyOn(exception, 'catcher').and.returnValue(function () {});
        });
    });

    it('should be defined', function () {
        expect(dataService).toBeDefined();
    });

    beforeEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    describe('get', function() {
        it('should return data when success', function () {
            var data = 'data';
            httpBackend
                .expectGET(apiRoot + 'item')
                .respond(200, data);

            dataService.get('item')
                .then(function (result) {
                    expect(result).toEqual(data);
                });
            httpBackend.flush();
            expect(exception.catcher).not.toHaveBeenCalled();
        });

        it('should handle param successfully', function() {
            var data = 'data';
            var param = {
                size: 10
            };
            httpBackend
                .expectGET(apiRoot + 'item' + '?size=10')
                .respond(200, data);

            dataService.get('item', param)
                .then(function (result) {
                    expect(result).toEqual(data);
                });
            httpBackend.flush();
            expect(exception.catcher).not.toHaveBeenCalled();
        });

        it('should catch when error', function () {
            var data = 'data';
            httpBackend
                .expectGET(apiRoot + 'item')
                .respond(500, data);

            dataService.get('item');
            httpBackend.flush();
            expect(exception.catcher).toHaveBeenCalled();
        });
    });

    describe('post', function() {
        it('should return data when success', function () {
            var data = 'data';
            httpBackend
                .expectPOST(apiRoot + 'item')
                .respond(200, data);

            dataService.post('item')
                .then(function (result) {
                    expect(result).toEqual(data);
                });
            httpBackend.flush();
            expect(exception.catcher).not.toHaveBeenCalled();
        });

        it('should catch when error', function () {
            var data = 'data';
            httpBackend
                .expectPOST(apiRoot + 'item')
                .respond(500, data);

            dataService.post('item');
            httpBackend.flush();
            expect(exception.catcher).toHaveBeenCalled();
        });
    });

    describe('put', function() {
        it('should return data when success', function () {
            var data = 'data';
            httpBackend
                .expectPUT(apiRoot + 'item')
                .respond(200, data);

            dataService.put('item')
                .then(function (result) {
                    expect(result).toEqual(data);
                });
            httpBackend.flush();
            expect(exception.catcher).not.toHaveBeenCalled();
        });

        it('should catch when error', function () {
            var data = 'data';
            httpBackend
                .expectPUT(apiRoot + 'item')
                .respond(500, data);

            dataService.put('item');
            httpBackend.flush();
            expect(exception.catcher).toHaveBeenCalled();
        });
    });

    describe('patch', function() {
        it('should return data when success', function () {
            var data = 'data';
            httpBackend
                .expectPATCH(apiRoot + 'item')
                .respond(200, data);

            dataService.patch('item')
                .then(function (result) {
                    expect(result).toEqual(data);
                });
            httpBackend.flush();
            expect(exception.catcher).not.toHaveBeenCalled();
        });

        it('should catch when error', function () {
            var data = 'data';
            httpBackend
                .expectPATCH(apiRoot + 'item')
                .respond(500, data);

            dataService.patch('item');
            httpBackend.flush();
            expect(exception.catcher).toHaveBeenCalled();
        });
    });

    describe('del', function() {
        it('should return data when success', function () {
            var data = 'data';
            httpBackend
                .expectDELETE(apiRoot + 'item')
                .respond(200, data);

            dataService.del('item')
                .then(function (result) {
                    expect(result.data).toEqual(data);
                });
            httpBackend.flush();
            expect(exception.catcher).not.toHaveBeenCalled();
        });

        it('should catch when error', function () {
            var data = 'data';
            httpBackend
                .expectDELETE(apiRoot + 'item')
                .respond(500, data);

            dataService.del('item');
            httpBackend.flush();
            expect(exception.catcher).toHaveBeenCalled();
        });
    });
});
