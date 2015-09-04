/* global toastr:false, moment:false */
(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('APP_NAME', 'ToDoList')
        .constant('toastr', toastr)
        .constant('moment', moment);
})();
