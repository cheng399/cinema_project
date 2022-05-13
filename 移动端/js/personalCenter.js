$(function() {
    let data = getCurrentAccount()
    if (isLogin()) {
        $('.exit').attr('class', 'exit')
        $('#header p').html(data[0])
    } else {
        $('#header p').html('请登录')
        $('.exit').attr('class', 'login')
    }
    $('.change').on('click', function() {
        if (isLogin()) {
            location.href = './changePass.html'
        } else {
            alert('请先登录吧!')
        }
    })
    $('li:eq(2)').on('click', function() {
        if ($(this).hasClass('exit')) {
            $('#header p').html('请登录')
            $(this).attr('class', 'login')
            data[3] = false
            setCurrentAccount(data)
        } else if ($(this).hasClass('login')) {
            location.href = './login.html'
        }
    })
})