/* global _:false */
/* global moment:false */
/* global toastr:false */
(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('toastr', toastr)
        .constant('moment', moment)
        .constant('_', _)
        .constant('constant', {
            APP_NAME: 'Project',
            API_HOST: 'http://localhost:3000'
        })
        .constant('YWEATHER_URL', [
            [
                'https://query.yahooapis.com/v1/public/',
                'yql?q=select%20*%20from%20weather.forecast%20where%',
                '20woeid%20in%20(select%20woeid%20from%20geo.places(1)%',
                '20where%20text%3D%22jakarta%22)&format=json&env=store%',
                '3A%2F%2Fdatatables.org%2Falltableswithkeys'
            ].join('')
        ]);

})();
