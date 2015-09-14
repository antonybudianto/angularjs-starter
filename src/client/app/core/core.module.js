(function () {
    'use strict';

    angular
        .module('app.core', [
            'app.core.data',
            'ngAnimate', 'ngSanitize',
            'blocks.exception', 'blocks.logger', 'blocks.router',
            'ui.router', 'ngplus', 'ui.bootstrap'
        ]);
})();
