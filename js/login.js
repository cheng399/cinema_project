$(function() {
    let account = getMovieAccount() || []
    let currentAccount = getCurrentAccount()
    let username = $('[name=userName]')
    let password = $('[name=userPass]')

    // 用户名验证
    function verifyUsername() {
        let msg = $(this).next()
        if (account.some(e => e.uname === $(this).val())) {
            msg.html('')
            return true
        } else {
            msg.html('用户名输入有误')
            return false
        }
    }
    $('shade input:not([type="checkbox"]').on('focus', function() {
        $(this).next().html('')
    })

    // 密码验证
    function verifyPassword() {
        let msg = $(this).next()
        let flag = account.some(e => {
            if (e.uname === username.val()) return e.upass === $(this).val()
        })
        if (flag) {
            msg.html('')
            return true
        } else {
            msg.html('密码错误')
            return false
        }
    }
    $('.login').on('click', 'button', function(e) {
        e.preventDefault()
        currentAccount = ['', '', false, false, {
            "orderid": "",
            "userphone": "",
            "movieid": "",
            "cinemaid": "",
            "seats": "",
            "buytime": "",
            "playtime": "",
            "status": ""
        }]
        setCurrentAccount(currentAccount)
        let checkbox = $('[type="checkbox"]')
        let flag = checkbox.last().prop('checked')
        if (flag !== undefined && flag === false) {
            alert('请勾选用户协议')
            return false
        }
        if (!verifyUsername.call(username[0])) {
            return
        } else if (!verifyPassword.call(password[0])) {
            return
        } else {
            // 登录成功后执行
            currentAccount[0] = username.val()
            currentAccount[1] = password.val()
            currentAccount[2] = checkbox.first().prop('checked') || false
            currentAccount[3] = true
            if (isMobile()) {
                location.href = "../index.html"
            } else {
                $('.close').click()
                $('.exit').show().prev().prop('disabled', true).html(`欢迎您,${currentAccount[0]}`).css('color', '#f00')
            }
        }
        setCurrentAccount(currentAccount)
    })
    $('.back').on('click', function() {
        history.go(-1)
    })
})