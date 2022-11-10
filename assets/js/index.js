$(function () {
    // 调取函数获取用户基本信息
    getUserInfo()

    var layer = layui.layer

    // *点击按钮实现退出功能
    $('#btnLogout').on('click', function () {
        layer.confirm('确认退出登录？', { icon: 3, title: '提示' }, function (index) {
            //   TODO:清空本地token  重新跳转到登陆页面
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index)
        })
    })
})


// *获取用户的基本信息
function getUserInfo() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            // 调用renderAvatar渲染用户头像
            renderAvatar(res.data)
        }
    })
}

// *渲染用户头像
function renderAvatar(user) {
    // 获取用户名称
    var name = user.nikename || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 用户头像渲染
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide()
        $('.text-avatar').html(name[0].toUpperCase()).show()
    }
}