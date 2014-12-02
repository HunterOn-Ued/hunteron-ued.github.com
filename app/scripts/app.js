/**
 * Created by mizi on 2014/11/11.
 */
'use strict';

angular.module('blog.resources', [
    'blog.resources.ued'
]);

angular.module('blog.services', [
]);

angular.module('blog.controllers', [
    'blog.controllers.ued'
]);

angular.module('blog.filters', [
]);

angular.module('blog.directives', [
]);

angular.module('blog.config', [
    'blog.config.routers',
    'blog.config.setting'
]);

angular.module('blog', [
    'fdf',
    'blog.config',
    'blog.filters',
    'blog.directives',
    'blog.resources',
    'blog.services',
    'blog.controllers'
]);

angular.element(document).ready(function() {
    angular.bootstrap(document, ['blog']);
});


