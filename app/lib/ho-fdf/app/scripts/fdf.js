(function(window, angular, undefined){
    'use strict';

    angular.module('fdf.resources', [
        'fdf.resources.base'
    ]);

    angular.module('fdf.services', [
        'fdf.services.base'
    ]);

    angular.module('fdf.controllers', [
    ]);

    angular.module('fdf.filters', [
//    'fdf.filters.string',
//    'fdf.filters.data',
//    'fdf.filters.array',
//    'fdf.filters.math'
    ]);

    angular.module('fdf.directives', [
        'fdf.directives.base'
    ]);

    angular.module('fdf.config', [
        'fdf.config.utils',
        'fdf.config.global',
        'fdf.config.setting'
    ]);

    angular.module('fdf', [
        'ngSanitize',
        'ngResource',
        'fdf.config',
        'fdf.filters',
        'fdf.directives',
        'fdf.resources',
        'fdf.services',
        'fdf.controllers'
    ]);

})(window, angular);





