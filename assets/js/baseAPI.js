// !每次调用 $.get() $.post() $.ajax() 之前先调用这个函数
// 在这个函数中可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {

    options.url = 'http://www.liulongbin.top:3007' + options.url
    console.log(options.url)
})