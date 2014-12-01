
(function(window, angular, undefined){
    'use strict';
    /**
     * 全局环境配置
     * 1. 进度条
     * 2. 工具类集成
     * 3. http 监控
     * 3. Servers 初始化
     * Created by mizi on 2014/11/11.
     */

    angular.module('bfdf.config.setting', [])

    .run(['app', function (app) {
            app.$_Candidate = app.$injector.get("$_Candidate");

     }]);


})(window, angular);



