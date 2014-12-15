米子说： 为什么基于angularjs的前端架构我不使用requirejs？
====

## 从业务层面来说

> 在我的认识里，永远没有最好的技术，只有最适合当前环境的技术

#### 首先我们必须认识我们公司产品的特色

有人说我们公司的产品是SaaS（Software-as-a-Service），也有人说是B2C, B2B 等等，
众说纷纭
但不管是HR，HD，CRM 还是未来即将出现的 HA，都是针对企业应用系统。

企业应用系统的特点就是针对某个行业或某一特殊人群，功能较复杂，对界面的要求一般是整齐，不追花俏，
但对功能要求稳定，对用户体验大多数只要求到能用或易用。

#### 企业级应用的主要特点

* 独占模式——一般用户使用互联网产品，都是片段时间使用，比如购物或者阅读，做完之后就刷新或者关闭浏览器了，
而企业应用往往是工作的全部，从早上上班开始打开，到下班才关掉，一天绝大部分工作都在上面完成，
比如一个呼叫中心的操作员, 又比如业务部分的 EM。

* 重业务，轻视觉——企业应用对视觉的追求是比较低的，一般不会要求花哨效果，以业务操作的流畅性为第一目标。

* 界面规整，单一模式——企业应用的界面布局相对有模式可循，可以用很少的场景来穷举，界面横平竖直，比较规整，使用到的控件元素也是可穷举的，基本没有什么特效。

* 逻辑复杂——我之前所在的行业中，业务逻辑很复杂，前端可能会需要写很多复杂的逻辑，JS代码大部分是在处理逻辑，而不是界面交互。

* 加载速度的侧重不同——互联网产品往往很重视首屏优化，但是其策略可能与企业应用不同。
比如说，3个200k的模块，在网站型产品中可能优化成一个100k加三个150k的模块，但在企业应用中，很可能优化成一个400k加三个50k的模块。
为什么会这样呢？因为内容型的网站讲究的优化策略是分摊，如果首次加载太慢，会很影响用户的信心，
但企业应用用户的容忍度是较高的，他并不在乎刚打开的时候慢一些，因为打开了之后就要用一天，
对于之后每步操作的模块加载速度倒是要求很高。
另外，对于内存泄露的处理，也要求得比较高一些。整个这些策略，其实是来源于C/S系统的影响。

## requriejs 的特点

RequireJS 遵循的是 AMD（异步模块定义）规范：

1. 代码模块化
2. 异步加载
3. 按需加载

## 为什么我对requirejs say no

### 代码模块化

angularjs 本身就遵从模块化开发，使用强大的ng的依赖管理，可以随意调用ng定义个的各个模块;
ng 并不关心各个模块申明的顺序


“app”对象是Angular应用正常运行的关键。
在一般的使用中，Angular会假设在应用“启动”时文档已经加载完毕。

根据AngularJS的文档，Angular会在DOMContentLoaded事件发生时完成“自动初始化”。

换句话说：在document.readState被设置为complete时，angular.js脚本会被调用。
在实际运行中，当DOM已经加载完成之后，Angular都会进行的步骤如下：

加载有ng-app指定的模块
创建一个应用注入器 - 它能够根据字符串的值将对象注入到相应模块中
编译ng-app属性所在标签下面的DOM树
以上的步骤就是一般情况下Angular会做的事情。只要所有的脚本在DOMContentLoaded事件之前加载完毕(可以将它看作document.ready)，一切都能正常运行。
再换句话说：要使用ng就必须 在DOMContentLoaded事件执行之前加载完毕所需要的js文件；

那么是否可以这么理解，ng对requireJS的模块化没有太大的需求，同时对按需加载也没有太大意义上的需求。

### 如果只剩下异步加载？

那么LABjs 是否就可以完全满足需求了呢？

### 麻烦

RequireJS是一个好东西，但是如果和AngularJS一起使用，就会出现问题。核心问题在于Angular需要在DOM完全加载之后开始运行，它并不想要玩异步游戏。由于RequireJS中一切都是异步的(AMD即异步模块定义)，你很难将二者很好的结合起来。

由于脚本载入是异步的，所有的ng-app属性现在完全不可用了。你不可以使用它来指明Angular应用。

另一个讨厌的事情是app模块。为了传递它你必须使用疯狂的环形依赖。

下面我们来使用RequireJS进行文件架构：

app partials home.html controllers index.js module.js homeController.js services index.js modules.js productsDataSource.js app.js main.js routes.js

我们先从main.js这个文件开始，它在其中配置了所有的库文件信息，并且对于不遵循AMD标准的模块进行了shim设置。该文件的目的是确保所有的js文件都能通过正确的路径载入。

```javascript
require.config({
  paths: {
    'jquery': 'vendor/jquery/jquery',
    'angular': 'vendor/angular/angular',
    'kendo': 'vendor/kendo/kendo',
    'angular-kendo': 'vendor/angular-kendo',
    'app': 'app'
  },
  shim: {
    // 确保kendo在angular-kendo之前载入
    'angular-kendo': ['kendo'],
    // make sure that
    'app': {
        deps: ['jquery', 'angular', 'kendo', 'angular-kendo']
    }
  }
});

define(['routes'], function () {

  // 使用bootstrap方法启动Angular应用
  angular.bootstrap(document, ['app']);

});
```

在angular.bootstrap方法运行之前，所有的文件已经载入完毕了。

这些依赖工作由RequireJS进行解析。

注意到上面的代码中define函数对route.js文件发出了请求。

RequireJS接着就会在执行angular.bootstrap方法之前载入该文件。

```javascript
// routes.js

define([
  './app'
], function (app) {

  // app是Angular应用对象
  return app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/home',
        {
          templateUrl: '/app/partials/home.html',
          controller: 'homeController'
        })
      .otherwise(
        {
          redirectTo: '/home'
        });

  }]);
});
```

route.js文件声明app.js为依赖项。

app.js文件创建了一个Angular应用对象，并且将它暴露给外部以便于路由可以获取它。

```javascript
// app.js

define([
  './controllers/index',
  './services/index'
], function (controllers, index) {

  // 返回真正的Angular应用对象，在声明时指明了依赖的项目
  return angular.module('app', [
    'ngRoute',
    'kendo.directives',
    'app.controllers',
    'app.services'
  ]);
});
```

app.js文件创建了模型并且注入了所有所需要的依赖项。

其中包含ngRoute服务，Angular Kendo UI 指定以及其他两个模块，这两个模块都在文件的顶部定义。

我们首先来看看”controllers/index.js”文件。

```javascript
// controllers/index.js

define([
  './homeController'
], function () {

});
```

```
// controllers/homeController.js

define([
  './module'
], function (module) {

  module.controller('homeController', ['$scope', '$productsDataSource',
    function ($scope, $productsDataSource) {
      $scope.title = 'Home';
      $scope.productsDataSource = $productsDataSource;

      $scope.listViewTemplate = '<p>#: ShipCity #</p>';
    };
  );

});
```

```
// controllers/module.js

define([
], function () {

  return angular.module('app.controllers', []);

});
```

我们现在来回顾一下从一开始到现在究竟发生了些什么：

```
“main.js” requires “routes.js”
    “routes.js” requires “app.js”
        “app.js” requires “controllers/index.js”
            “controllers/index.js” requires 所有的控制器
                所有的控制器 require “module.js”
                    “module.js” 创建了 “app.controllers” 模块
```

这有点像一颗过于庞大的依赖树，但是它的可扩展性确实很好。如果你想添加一个新的控制器，你只需要添加”controllers/nameController.js”文件，并在”controllers/index.js”文件中添加相同的依赖项即可。

服务的运作方式和控制器类似。app.js会require services/index.js文件，它require了所有的服务。所有的服务同时会require services/module.js文件，它能够简单的创建并提供app.services模块。

现在回到app.js文件，所有的项目都在其中被加载并传递给我们创建的Angular应用模块。最后一件发生的事情是main.js文件中所发生的angular.bootstrap。简单来说，我们第一眼看到的代码其实在最后才会执行。

这实在是有点难以理解。

RequireJS会在应用运行之前加载所有的代码。这意味着我们并没有实现代码的延迟加载。