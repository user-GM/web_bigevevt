$(function () {

    var form = layui.form

    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '用户名长度应该是1~6位字符'
            }
        }
    })

    initUserInfo()
    // *初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败！')
                }

                // 调用form.val()快速为表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    }

    // *重置表单的数据
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })

    // *更新用户信息
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新用户信息失败！')
                }
                layui.layer.msg('更新用户信息成功！')
                // 调用父页面中方法，重新渲染用户头像和信息
                window.parent.getUserInfo()
            }
        })
    })
})