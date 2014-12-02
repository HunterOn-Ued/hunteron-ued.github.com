(function(window, angular, undefined){

angular.module('blog.controllers.ued', [])
// ued
.controller('UedCtrl', ['app', function(app){
    var vm = this;

    app.$_Ued.ueds.get({}, function(res){
        vm.list = res.data;
    });


    return vm;
}])

.controller('UedDetailDefaultCtrl',['app', function(app){
    var vm = this;

    app.$_Ued.ueds.get({}, function(res){
        vm.list = res.data;
    });

    return vm;
}]);

})(window, angular);