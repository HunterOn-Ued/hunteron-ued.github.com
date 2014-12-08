Angular’s “Controller as” syntax
=====

之前我们习惯在 controller 中注入 $scope, 在view中绑定scope对象，
使用的直接使用 scope 

```html
&lt;div ng-app="app" ng-controller="MainCtrl">
      hello : {{title}} !
&lt;/div>

app.controller('MainCtrl', function ($scope) {
  $scope.title = 'Some title';
});

```

在 ng 1.2 版本开始，带来了一个新的语法糖 controller as

```
&lt;div ng-app="app" ng-controller="MainCtrl as m">
      hello : {{m.title}} !
&lt;/div>　

app.controller('MainCtrl', function () {
      var vm = this;
      this.title = 'Some title';
      return vm;
});

```

在这里 controller 不再有 $scope 注入， 是个简单的平面对象；

### controller 的实现原理是什么？

我们直接看 ng 的源码 （如要查看完整的源码，请自行看 compile.js)

```javascript
if (directive.controllerAs) {
    locals.$scope[directive.controllerAs] = controllerInstance;
}　

```

实现就是这么简单，一行可以搞定

那么我们是不是可以这样理解，controller as 的实现就是如下方式

```javascript
app.controller('MainCtrl', function ($scope) {
    $scope.m = this;
});

```

它看起来很神秘，但揭开面纱，也就这样

### controller as 的好处

* 定义vm， 可以更好的避免Javascript 的坑
* controller 引入的fn，可以被其他 controller 继承引用
* 因为controller实例将会只是$scope的一个属性，所以view模板上的所有字段都会在一个引用的属性上，这可以避开JavaScript原型链继承对于值类型的坑
* 模板上定义的每个字段方法都会在scope寄存在controller as别名上的引用上，所以在controller继承中，不会在出现命名冲突的问题

``` html
&lt;div ng-controller="MainCtrl">
  {{ title }}
  &lt;div ng-controller="AnotherCtrl">
    Scope title: {{ title }}
    Parent title: {{ $parent.title }}
    &lt;div ng-controller="YetAnotherCtrl">
      {{ title }}
      Parent title: {{ $parent.title }}
      Parent parent title: {{ $parent.$parent.title }}
    &lt;/div>
  &lt;/div>
&lt;/div>

&lt;div ng-controller="MainCtrl as main">
  {{ main.title }}
  &lt;div ng-controller="AnotherCtrl as another">
    Scope title: {{ another.title }}
    Parent title: {{ main.title }}
    &lt;div ng-controller="YetAnotherCtrl as yet">
      Scope title: {{ yet.title }}
      Parent title: {{ another.title }}
      Parent parent title: {{ main.title }}
    &lt;/div>
  &lt;/div>
&lt;/div>
```

### controller as 缺点

> 也因为没有了$scope，而controller实例将会成为scope上的一个属性，
所以在controller中我们再也不能使用$watch,$emit,$on之类的特殊方法，
因为这些东西往往不该出现在controller中的，给大家一个警告，更好的控制。

如果一旦没有办法, 一定要使用上述方法，那么controller 可以回滚到 $scope
 
#### $on

```javascript
app.controller('MainCtrl', function ($scope) {
  this.title = 'Some title';
  $scope.$on('someEventFiredFromElsewhere', function (event, data) {
    // do something!
  });
});

```

#### $watch

在使用 controller as 时 $scope.$watch 按原来的监控方式不能直接使用的

```javascript
app.controller('MainCtrl', function ($scope) {
  this.title = 'Some title';
  // doesn't work!
  $scope.$watch('title', function (newVal, oldVal) {});
  // doens't work!
  $scope.$watch('this.title', function (newVal, oldVal) {});
});

```

你需将监控条件改为一个function

``` javscript

app.controller('MainCtrl', function ($scope) {
  this.title = 'Some title';
  // nearly there...
  $scope.$watch(function () {
    return this.title; // `this` isn't the `this` above!!
  }, function (newVal, oldVal) {});
})

```

或者你可以使用 angular.bind 方法

```javascript
app.controller('MainCtrl', function ($scope) {
  this.title = 'Some title';
  // boom
  $scope.$watch(angular.bind(this, function () {
    return this.title; // `this` IS the `this` above!!
  }), function (newVal, oldVal) {
    // now we will pickup changes to newVal and oldVal
  });
});

```

## 设置 controller

* 在HTML里

```html
&lt;div ng-controller="MainCtrl as main">
```

* directive

```javascript
app.directive('myDirective', function () {
  return {
    restrict: 'EA',
    replace: true,
    scope: true,
    template: [].join(''),
    controllerAs: '', // woohoo, nice and easy!
    controller: function () {}, // we'll instantiate this controller "as" the above name
    link: function () {}
  };
});
```

* router

```javascript
app.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/main.html',
    controllerAs: '',
    controller: ''
  })
  .otherwise({
    redirectTo: '/'
  });
});
```

* ui-router

```javascript
//候选人页
.state('b.m.candidate', {
    url: '^/candidate',
    views: {
        'list@b.m': {
            templateUrl: '/views/backend/candidate/candidate.list.html',
            controller: 'CandidateListCtrl as cdds'
        }
    }
})
```



