(function() {
    'use strict';

    angular
        .module('app.core.data')
        .factory('peopleService', peopleService);

    /* @ngInject */
    function peopleService($resource) {
        var service = $resource('/api/people/:id', {}, {
            update: {
                method: 'PUT'
            }
        });
        return service;

        ////////////////
    }
})();
