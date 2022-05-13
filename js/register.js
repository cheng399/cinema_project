$(function() {
    let account = getMovieAccount()

    // 用户名验证 同时验证该用户名是否已被注册
    let username = $('[name=registerUser]')
    username.on('change', verifyUsername)

    function verifyUsername() {
        let msg = $(this).next()
        let reg = /^[\u4e00-\u9fa5a-zA-Z0-9-_]{3,15}$/
        if (reg.test($(this).val())) {
            if (account.some((e) => e.uname === $(this).val())) {
                msg.html('用户名已被注册')
                return false
            }
            msg.html('')
            return true
        } else {
            msg.html('用户名不符合规范,请输入3-15位字符')
            return false
        }
    }
    // 密码验证
    let password = $('[name=registerPass]')
    password.on('change', verifyPassword)

    function verifyPassword() {
        let msg = $(this).next()
        let reg = /^[A-Z][a-zA-Z0-9-_]{5,15}$/
        if (reg.test($(this).val())) {
            msg.html('')
            return true
        } else {
            msg.html('密码不符合规范,请输入6-16位字符,且以大写字母开头')
            return false
        }
    }
    // 验证两次密码输入是否一致
    let confirm = $('[name=conPass]')
    confirm.on('change', verifyConfirm)

    function verifyConfirm() {
        let msg = $(this).next()
        if ($(this).val() === password.val()) {
            msg.html('')
            return true
        } else {
            msg.html('两次密码不一致')
            return false
        }
    }
    $('.register').on('click', 'button', function(e) {
        e.preventDefault()
            // 表单数据验证成功后保存跳转
        if (verifyUsername.call(username[0]) && verifyPassword.call(password[0]) && verifyConfirm.call(confirm[0])) {
            let obj = {
                uname: username.val(),
                upass: password.val(),
                ticket: []
            }
            account.push(obj)
            setMovieAccount(account)
            if (isMobile()) {
                location.href = "./login.html"
            } else {
                $('.close').click()
            }
        }
    })

    $('.back').on('click', function() {
        history.go(-1)
    })

})