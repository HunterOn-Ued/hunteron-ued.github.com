(function(window, angular, undefined){

'use strict';

/**
 * router 使用 angular-ui-router
 */
angular.module('blog.config.routers', ['ui.router'])

.run(['app', '$state', '$stateParams',
    function (app, $state, $stateParams) {
        app.$state = $state;
        app.$stateParams = $stateParams;
    }
])

.config(['app', '$stateProvider', '$urlRouterProvider',
    function(app, $stateProvider, $urlRouterProvider){

        $urlRouterProvider.when('', '/ued')
            .when('/', '/ued')
            .otherwise('/ued');

        $stateProvider

        /**
        * back-end management
        * backend alias b
        * 后端管理页
        */

        .state('b', {
            url: '^/backend',
            views: {
                'backend@': {
                    templateUrl: 'views/backend.html',
                    controller: ['app', function(app){
                        app.$rootScope.area = app.AREA_BACKEND;
                    }]
                }
            }
        })

        /**
        * layout 1-1-1
        * backend.main alias b.m
        * 左中右三列布局模式
        */
        .state('b.m', {
            url: '^/backend/main',
            views: {
                'main@b': {
                    templateUrl: 'views/backend/layout.html',
                    controller: ['app', function(app){
                        app.$rootScope.layout = app.LAYOUT_DOUBLE;
                    }]
                }
            }
        })

        /**
         * ued list
         */
        .state('b.m.ued', {
            url: '^/ued',
            views: {
                'list@b.m': {
                    templateUrl: 'views/backend/list.html',
                    controller: 'UedCtrl as Ds'
                },
                'detail@b.m': {
                    templateUrl: 'views/backend/detail.default.html',
                    controller: 'UedDetailDefaultCtrl as Dd'
                }
            }
        })

        .state('b.m.ued.detail', {
            url: '^/ued/detail/{id}',
            views: {
                'detail@b.m': {
                    templateUrl: 'views/backend/detail.html',
                    controller: 'UedDetailCtrl as Dt'
                }
            }
        })

        /**
         * ued example
         */
        .state('b.m.ex', {
            url: '^/ex',
            views: {
                'list@b.m': {
                    templateUrl: 'views/backend/list.html',
                    controller: 'ExCtrl as Ds'
                },
                'detail@b.m': {
                    templateUrl: 'views/backend/detail.default.html',
                    controller: 'ExDetailDefaultCtrl as Dd'
                }
            }
        })

        .state('b.m.ex.detail', {
            url: '^/ex/detail/{id}',
            views: {
                'detail@b.m': {
                    templateUrl: 'views/backend/example/ex.detail.html',
                    controller: 'ExDetailCtrl as Dt'
                }
            }
        })

    }
]);

})(window, angular);


