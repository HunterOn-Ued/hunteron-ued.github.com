(function(window, angular, undefined){

angular.module('blog.resources.example', [])
    .run(['app', function(app){
        app.$_Ex = app.$injector.get('$_Ex');
    }])

    .service('$_Ex', ['$resource', function ($resource) {
        return {
            list: $resource('store/examples.json')
        }
    }]);


})(window, angular);