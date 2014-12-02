(function(window, angular, undefined){

angular.module('blog.resources.ued', [])

.run(['app', function(app){
    app.$_Ued = app.$injector.get('$_Ued');
}])

.service('$_Ued', ['$resource', function ($resource) {
    return {
        ueds: $resource('store/ueds.json')
    }
}])


})(window, angular);