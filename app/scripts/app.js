/**
 * Created by mizi on 2014/11/11.
 */
'use strict';

angular.module('bfdf.resources', [
    'bfdf.resources.candidate'
]);

angular.module('bfdf.services', [
]);

angular.module('bfdf.controllers', [
    'bfdf.controllers.front',
    'bfdf.controllers.candidate'
]);

angular.module('bfdf.filters', [
]);

angular.module('bfdf.directives', [
]);

angular.module('bfdf.config', [
    'bfdf.config.routers',
    'bfdf.config.setting'
]);

angular.module('bfdf', [
    'fdf',
    'bfdf.config',
    'bfdf.filters',
    'bfdf.directives',
    'bfdf.resources',
    'bfdf.services',
    'bfdf.controllers'
]);

angular.element(document).ready(function() {
    angular.bootstrap(document, ['bfdf']);
});


