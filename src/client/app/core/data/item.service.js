(function() {
    'use strict';

    angular
        .module('app.core.data')
        .factory('itemService', itemService);

    /* @ngInject */
    function itemService($resource) {
        var service = $resource('/api/item/:id', {}, {
            update: {
                method: 'PUT'
            }
        });
        return service;

        ////////////////
    }
})();
