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
        });

})();
