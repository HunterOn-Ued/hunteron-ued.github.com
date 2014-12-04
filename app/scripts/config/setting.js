
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

angular.module('blog.config.setting', [
    // markdown 语法解析
    'hc.marked',
    // 语法高亮
    'hljs'
])

.config(['markedProvider', function(markedProvider) {
    markedProvider.setOptions({
        gfm: true,
        tables: true,
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        }
    });
}])

.config(function (hljsServiceProvider) {
    //https://github.com/pc035860/angular-highlightjs
    hljsServiceProvider.setOptions({
        // replace tab with 4 spaces
        tabReplace: '    '
    });
})

.run(['app', function (app) {
        app._uri = function(url, type){
            switch(type){
                case 'bahavior':
                    return 'bahavior' + url;
                default:
                    var uri = location.pathname;
                    return uri + url;
            }
        };
 }]);


})(window, angular);



