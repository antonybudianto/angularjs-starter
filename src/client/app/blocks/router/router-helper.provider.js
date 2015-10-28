/* Help configure the state-base ui.router */
(function() {
    'use strict';

    angular
        .module('blocks.router')
        .provider('routerHelper', routerHelperProvider);

    /* @ngInject */
    function routerHelperProvider($locationProvider, $stateProvider, $urlRouterProvider) {
        /* jshint validthis:true */
        var config = {
            docTitle: undefined,
            resolveAlways: {}
        };

        $locationProvider.html5Mode(true);

        this.configure = function(cfg) {
            angular.extend(config, cfg);
        };

        this.$get = RouterHelper;

        /* @ngInject */
        function RouterHelper($location, $rootScope, $state, logger, authService) {
            var handlingStateChangeError = false;
            var hasOtherwise = false;
            var stateCounts = {
                errors: 0,
                changes: 0
            };

            var service = {
                configureStates: configureStates,
                getStates: getStates,
                stateCounts: stateCounts,
                handleStateChangeError: handleStateChangeError
            };

            init();

            return service;

            function configureStates(states, otherwisePath) {
                states.forEach(function(state) {
                    state.config.resolve =
                        angular.extend(state.config.resolve || {}, config.resolveAlways);
                    $stateProvider.state(state.state, state.config);
                });
                if (otherwisePath && !hasOtherwise) {
                    hasOtherwise = true;
                    $urlRouterProvider.otherwise(otherwisePath);
                }
            }

            function handleRoutingErrors() {
                // Route cancellation:
                // On routing error, go to the dashboard.
                // Provide an exit clause if it tries to do it twice.
                $rootScope.$on('$stateChangeError', handleStateChangeError);
            }

            function handleStateChangeError(event, toState, toParams,
                fromState, fromParams, error) {
                if (handlingStateChangeError) {
                    return;
                }
                stateCounts.errors++;
                handlingStateChangeError = true;
                var destination = (toState &&
                    (toState.title || toState.name || toState.loadedTemplateUrl)) ||
                    'unknown target';
                var msg = 'Error routing to ' + destination + '. ' +
                    (error.data || '') + '. <br/>' + (error.statusText || '') +
                    ': ' + (error.status || '');
                logger.error(msg, [toState]);
                $location.path('/');
            }

            function init() {
                handleRoutingErrors();
                handleAuthRoutes();
                updateDocTitle();
            }

            function getStates() { return $state.get(); }

            function handleAuthRoutes () {
                $rootScope.$on('$stateChangeStart', function(event, to, from) {
                    if (to.afterAuth && authService.isAuth()) {
                        event.preventDefault();
                        $state.go(to.afterAuth);
                        return;
                    }

                    if (!to.loginRequired || to.loginRequired === false) {
                        return;
                    }

                    if (!authService.isAuth()) {
                        event.preventDefault();
                        $state.go('login', {'afterLogin': to.name});
                        return;
                    }
                });
            }

            function updateDocTitle() {
                $rootScope.$on('$stateChangeSuccess',
                    function(event, toState, toParams, fromState, fromParams) {
                        stateCounts.changes++;
                        handlingStateChangeError = false;
                        var title = config.docTitle + ' ' + (toState.title || '');
                        $rootScope.title = title; // data bind to <title>
                    }
                );
            }
        }
    }
})();
