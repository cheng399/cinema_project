$(function() {
    let currentAccount = getCurrentAccount()
    let oldPass = $('.changepass [name=oldPass]')
    let newPass = $('.changepass [name=newPass]')
    let confirm = $('.changepass [name=conPass]')
    console.log(confirm)
    $('.changepass').on('input', 'input', () => {
        if (!currentAccount[3]) {
            $('.changepass input').val('')
            return alert('您还未登录!')
        } else {
            oldPass.on('change', verifyOldPass)

            // 密码验证
            newPass.on('change', verifyNewPass)

            // 验证两次密码输入是否一致
            confirm.on('change', verifyConfirm)
        }
    })
    verifyConfirm.call(confirm[0])
    $('.changepass').on('click', 'button', function(e) {
        e.preventDefault()
            // 表单数据验证成功后保存跳转
        if (!currentAccount[3]) {
            return alert('您还未登录!')
        } else {
            if (verifyOldPass.call(oldPass[0]) && verifyNewPass.call(newPass[0]) && verifyConfirm.call(confirm[0])) {
                currentAccount[1] = newPass.val()
                setCurrentAccount(currentAccount)
                let account = getMovieAccount() || []
                account.forEach((e, i, arr) => {
                    if (e.uname === currentAccount[0]) {
                        e.upass = newPass.val()
                    }
                })
                setMovieAccount(account)
                $('.close').click()
                alert('密码修改成功!')
                if (isMobile()) {
                    location.href = "../index.html"
                }
            }
        }
    })

    $('.back').on('click', function() {
        history.go(-1)
    })

    function verifyOldPass() {
        let msg = $('.changepass .user-msg')
        if ($(this).val() === currentAccount[1]) {
            msg.html('')
            return true
        } else {
            msg.html('原密码输入错误')
            return false
        }
    }

    function verifyNewPass() {
        let msg = $('.changepass .pass-msg')
        let reg = /^[A-Z][a-zA-Z0-9-_]{5,15}$/
        if (reg.test($(this).val())) {
            msg.html('')
            return true
        } else {
            msg.html('密码不符合规范,请输入6-16位字符,且以大写字母开头')
            return false
        }
    }

    function verifyConfirm() {
        let msg = $('.changepass .P-msg')
        if ($(this).val() === newPass.val()) {
            msg.html('')
            return true
        } else {
            msg.html('两次密码不一致')
            return false
        }
    }
})