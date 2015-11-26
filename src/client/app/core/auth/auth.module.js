(function () {
    'use strict';

    angular
        .module('app.core.auth', [
            'blocks.logger',
            'angular-jwt',
            'ui.router'
        ]);
})();
