(function () {
    'use strict';

    angular
        .module('app.core', [
            'blocks.exception',
            'blocks.logger',
            'blocks.router',
            'app.core.data',
            'app.core.auth',
            'ngAnimate',
            'ngSanitize',
            'ui.router',
            'ui.bootstrap'
        ]);
})();
