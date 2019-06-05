/**
 * requirejs配置
 * @type {String}
 */
define(function() {
    'use strict';
    // 是否开启debug模式
    window.AppUtil = {
        debug: true,
        baseUrl: '/',
        /**
         * 路由匹配
         */
        routeMatch: function(path) {
            var route = window.location.pathname;
            var baseUrl = AppUtil.baseUrl.replace(/\/+$/, '');
            path = path.replace(/^\/+/, '');
            var url = baseUrl + '/' + path;
            url = url.replace(/\/\//g, '');
            url = url.replace(/\/\//g, '/');
            return new RegExp('^' + url, 'i').test(route);
        },
        /**
         * 合并路径
         */
        mergePath: function(path) {
            var baseUrl = AppUtil.baseUrl.replace(/\/+$/, '');
            path = path.toString().replace(/^\/+/, '');
            var url = baseUrl + '/' + path;
            return url.replace(/\/\//g, '').replace(/\/\//g, '');
        }
    };
    require.config({
        baseUrl: GLOGAL.STATIC_ROOT,
        paths: {
            /* 库 */
            // jQuery
            'jquery': 'libs/jquery/3.4.1/jquery.min',
            // jQuery-UI
            'jquery.ui': 'libs/jqueryui/1.12.1/jquery-ui.min',
            // jQuery UI Touch Punch
            'jquery.ui.touch-punch': 'libs/jqueryui-touch-punch/0.2.3/jquery.ui.touch-punch.min',
            // underscore.js
            'underscore': 'libs/underscore.js/1.9.1/underscore-min',
            // Lodash
            'lodash': 'libs/lodash.js/4.17.11/lodash.min',
            // backbone.js
            'backbone': 'libs/backbone.js/1.4.0/backbone-min',
            // Backbone.Radio
            'backbone.radio': 'libs/backbone.radio/2.0.0/backbone.radio.min',
            // MarionetteJS (Backbone.Marionette)
            'backbone.marionette': 'libs/backbone.marionette/4.1.2/backbone.marionette.min',
            // Handlebars 
            'handlebars': 'libs/handlebars.js/4.1.2/handlebars.min',
            // requirejs-handlebars
            'hbars': 'libs/requirejs-handlebars/0.0.2/hbars.min',
            // require.js
            'require': 'libs/require.js/2.3.6/require.min',
            // require.js-text
            'text': 'libs/require-text/2.0.12/text.min',
            // require.js-css
            'css': 'libs/require-css/0.1.10/css.min',
            // require.js-domReady
            'domReady': 'libs/require-domReady/2.0.1/domReady.min',
            // core-js
            'core': 'libs/core-js/2.6.9/core.min',
            // gridstack.js
            'gridstack': 'libs/gridstack.js/0.4.0/gridstack.min',
            // gridstack.jQueryUI
            'gridstack.jqueryui': 'libs/gridstack.js/0.4.0/gridstack.jQueryUI.min'
        },
        map: {
            '*': {
                // 动态css加载
                'css': 'libs/require-css/0.1.10/css.min',
                // 将 lodash 伪装成 underscore
                'underscore': 'lodash',
                // 为 handlebars 取别名 Handlebars
                'Handlebars': 'handlebars',
                // jquery-ui
                'jquery-ui/data': 'jquery.ui',
                'jquery-ui/disable-selection': 'jquery.ui',
                'jquery-ui/focusable': 'jquery.ui',
                'jquery-ui/form': 'jquery.ui',
                'jquery-ui/ie': 'jquery.ui',
                'jquery-ui/keycode': 'jquery.ui',
                'jquery-ui/labels': 'jquery.ui',
                'jquery-ui/jquery-1-7': 'jquery.ui',
                'jquery-ui/plugin': 'jquery.ui',
                'jquery-ui/safe-active-element': 'jquery.ui',
                'jquery-ui/safe-blur': 'jquery.ui',
                'jquery-ui/scroll-parent': 'jquery.ui',
                'jquery-ui/tabbable': 'jquery.ui',
                'jquery-ui/unique-id': 'jquery.ui',
                'jquery-ui/version': 'jquery.ui',
                'jquery-ui/widget': 'jquery.ui',
                'jquery-ui/widgets/mouse': 'jquery.ui',
                'jquery-ui/widgets/draggable': 'jquery.ui',
                'jquery-ui/widgets/droppable': 'jquery.ui',
                'jquery-ui/widgets/resizable': 'jquery.ui'
            }
        },
        shim: {
            'jquery.ui': {
                exports: '$',
                deps: ['jquery'],
                async: false
            },
            'jquery.ui.touch-punch': {
                exports: '$',
                deps: ['jquery', 'jquery.ui'],
                async: false
            },
            'underscore': {
                exports: '_'
            },
            'backbone': {
                deps: [
                    'underscore',
                    'jquery'
                ],
                exports: 'Backbone'
            }
        },
        // 强制使用define函数来加载模块
        enforceDefine: true,
        // 设置请求超时
        // 为0时,关闭超时功能
        // 防止加载失败
        waitSeconds: 0,
        // 控制缓存
        urlArgs: AppUtil.debug ? 'debug=' + Math.random() : '',
        hbars: {
            extension: '.html',
            compileOptions: {}
        }
    });
    // 全局调用jquery
    require(['jquery'], function($) {
        function csrfSafeMethod(method) {
            // these HTTP methods do not require CSRF protection
            return ((/^(GET|HEAD|OPTIONS|TRACE)$/).test(method));
        }

        $.ajaxSetup({
            cache: false,
            beforeSend: function(xhr, settings) {
                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", $('input[name="csrfmiddlewaretoken"]').val());
                }
            }
        });
    });
    // 主页
    if (AppUtil.routeMatch('/(index/?)?$')) {
        require(['assets/views/index']);
    }
});