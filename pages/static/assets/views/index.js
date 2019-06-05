define([
    'require', 'lodash', 'jquery', 'backbone', 'backbone.radio', 'backbone.marionette'
], function(require, _, $, Backbone, Radio, Marionette) {
    // 设置模板渲染
    Marionette.View.setRenderer(function(template, data) {
        return Handlebars.compile(template)(data);
    });
    // 视图继承
    var View = Marionette.View.extend({
        tagName: 'div',
        templateContext: {
            isDr: function() {
                debugger;
                return (this.degree) === 'phd';
            },
            fullName: function() {
                debugger;
                return this.isDr() ? "无名氏" : this.name;
            }
        },
        render: function() {
            var self = this;
            require(['hbars!assets/templates/index/demo'], function (template) {
                self.template = template;
                self.$el.html(self.template(self.model.attributes));
            });
            return self;
        },
        defaults: {
            name: 'python'
        },
        className: 'bg-success',
        checkOption: function() {
            console.log(this.getOption('foo'));
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
        degree: 'phd',
        model: model
    });
    // 视图方法调用
    view.checkOption();
    // 渲染视图
    view.render();
    // 将渲染后的内容添加到页面上
    $('#article-region').empty().append(view.$el);
});