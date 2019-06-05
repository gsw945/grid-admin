define([
    'require', 'lodash', 'jquery', 'backbone', 'backbone.radio', 'backbone.marionette', 'handlebars'
], function(require, _, $, Backbone, Radio, Marionette, Handlebars) {
    // 设置模板渲染
    Marionette.View.setRenderer(function(template, data) {
        return Handlebars.compile(template)(data);
    });
    // 视图继承
    var View = Marionette.View.extend({
        tagName: 'div',
        templateContext: function() {
            var degree = this.getOption('degree');
            return {
                isDr: function() {
                    return (degree === 'phd');
                },
                fullName: function() {
                    return this.isDr() ? this.name : '无名氏';
                }
            };
        },
        defaults: {
            name: 'python'
        },
        className: 'bg-success',
        checkOption: function() {
            console.log(this.getOption('foo'));
        },
        prepareRender: function() {
            var self = this;
            require(['text!assets/templates/index/demo.html'], function (template) {
                self.template = template;
                self.render();
            });
        },
        initialize: function() {
            // foo --> onFoo
            this.triggerMethod('foo', 'baz');
        },
        onFoo: function(bar){
            console.log(bar);
        }
    });
    // 模型
    var model = new Backbone.Model({
        name: 'World'
    });
    // 视图
    var view = new View({
        foo: 'some text',
        degree: 'master',
        model: model
    });
    // 视图方法调用
    view.checkOption();
    // 渲染视图
    view.prepareRender();
    // 将渲染后的内容添加到页面上
    $('#article-region').empty().append(view.$el);
});