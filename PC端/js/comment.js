$(function() {
    let data = getCurrentAccount()

    // 判断是否登录
    if (isLogin()) {
        $('.exit').show().prev().prop('disabled', true).html(`欢迎您,${data[0]} `).css('color', '#f00')
    }
    const index = $('.h-bottom ul .active').index()
    $('.h-bottom ul li').hover(function() {
        $(this).addClass('active').siblings().removeClass('active')
    }, function() {
        $('.h-bottom ul li').eq(index).addClass('active').siblings().removeClass('active')
    })

    // 点击关闭登录、注册框
    $('.shade .close').on('click', function() {
        $('.shade').hide()
    })

    // 点击显示登录、注册框
    $('#header .w .fr').on('click', 'a', function() {
        let index = $(this).data('id')
        data = getCurrentAccount()
        if (index === 0 || index === 1) {
            $('.shade').show()
            if (data[2]) {
                $('[name=userName]').val(data[0])
                $('[name=userPass]').val(data[1])
            } else {
                $('[name=userName]').val('')
                $('[name=userPass]').val('')
            }
        } else {
            $(this).hide().prev().prop('disabled', false).html('登录').css('color', '#aaa')
            data[3] = false
            setCurrentAccount(data)
        }
        $('.content_head span').eq(index).click()
    })

    // 点击切换登录、注册框
    $('.content_head').on('click', 'span', function() {
        $(this).addClass('active').siblings().removeClass('active')
        let index = $(this).index()
        $('.content_main >div').eq(index).show().siblings().hide()
    })
    showPass()
})