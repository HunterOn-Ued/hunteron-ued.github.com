(function(window, angular, undefined){

angular.module('blog.controllers.ued', [])
// ued
.controller('UedCtrl', ['app', function(app){
    var vm = this;

    app.$rootScope.module = 'ued';

    app.$_Ued.list.get({}, function(res){
        vm.list = res.data;
    });

    return vm;
}])

.controller('UedDetailCtrl',['app', function(app){
    var vm = this;

    app.$_Ued.list.get({}, function(res){
        vm.detail = app.find(res.data, function(o, i){
            return o.id == app.$stateParams.id;
        });
    });
    return vm;
}])

.controller('UedDetailDefaultCtrl',['app', function(app){
    var vm = this;

    app.$_Ued.list.get({}, function(res){
        vm.list = res.data;
    });

    return vm;
}]);

})(window, angular);