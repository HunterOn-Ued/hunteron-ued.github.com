(function(window, angular, undefined){

angular.module('blog.controllers.example', [])

.controller('ExCtrl',['app', function(app){
    var vm = this;

    app.$rootScope.module = 'ex';

    app.$_Ex.list.get({}, function(res){
        vm.list = res.data;
    });

    return vm;
}])

.controller('ExDetailCtrl',['app', function(app){
    var vm = this;

    app.$_Ex.list.get({}, function(res){
        vm.detail = app.find(res.data, function(o, i){
            return o.id == app.$stateParams.id;
        });
    });

    vm.test = function(e){
        app.$Base.evt(e, app.$_Ex.list.get, function(rst){
            console.debug(rst);
        });
    };

    return vm;
}])

.controller('ExDetailDefaultCtrl',['app', function(app){
    var vm = this;

    app.$_Ex.list.get({}, function(res){
        vm.list = res.data;
    });

    return vm;
}]);

})(window, angular);