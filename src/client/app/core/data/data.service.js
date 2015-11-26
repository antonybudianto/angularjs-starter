/* jshint -W117 */
(function() {
    'use strict';

    angular
        .module('app.core.data')
        .factory('dataService', dataService);

    /* @ngInject */
    function dataService($q, $http, exception, constant, ENDPOINTS) {
        var apiRoot = constant.API_HOST + '/api/';
        var service = {
            endpoints: ENDPOINTS,
            get: get,
            post: post,
            put: put,
            patch: patch,
            del: del
        };

        return service;

        function get(endpoint, params, config) {
            params = params ? '?' + $.param(params) : '';
            config = config || {};
            return $http.get(apiRoot + endpoint + params, config)
                .then(function(result) {
                    return $q.when(result.data);
                })
                .catch(function(message) {
                    exception.catcher('Failed get data')(message);
                    return $q.reject(message.data);
                });
        }

        function post(endpoint, data) {
            return $http.post(apiRoot + endpoint, data)
                .then(function(result) {
                    return $q.when(result.data);
                })
                .catch(function(message) {
                    exception.catcher('Failed post data')(message);
                    return $q.reject(message.data);
                });
        }

        function put(endpoint, data) {
            return $http.put(apiRoot + endpoint, data)
                .then(function(result) {
                    return $q.when(result.data);
                })
                .catch(function(message) {
                    exception.catcher('Failed put data')(message);
                    return $q.reject(message.data);
                });
        }

        function patch(endpoint, data) {
            return $http.patch(apiRoot + endpoint, data)
                .then(function(result) {
                    return $q.when(result.data);
                })
                .catch(function(message) {
                    exception.catcher('Failed patch data')(message);
                    return $q.reject(message.data);
                });
        }

        function del(endpoint) {
            return $http.delete(apiRoot + endpoint)
                .then(function(result) {
                    return $q.when(result);
                })
                .catch(function(message) {
                    exception.catcher('Failed delete data')(message);
                    return $q.reject(message.data);
                });
        }
    }
})();
