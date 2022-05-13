// 获取电影数据
function getMovies(res) {
    let data = localStorage.getItem('movies')
    if (data && data !== 'undefined') {
        return JSON.parse(data)
    } else {
        let data = res || ''
        localStorage.setItem('movies', JSON.stringify(data))
        return data
    }
}

function setMovies(data) {
    localStorage.setItem('movies', JSON.stringify(data))
}

// 获取电影院数据

function getCinema(res) {
    let data = localStorage.getItem('cinema')
    if (data && data !== 'undefined') {
        return JSON.parse(data)
    } else {
        let data = res || ''
        localStorage.setItem('cinema', JSON.stringify(data))
        return data
    }
}

function setCinema(data) {
    localStorage.setItem('cinema', JSON.stringify(data))
}

// 获取电影种类数据

function getMovieType(res) {
    let data = localStorage.getItem('movieType')
    if (data && data !== 'undefined') {
        return JSON.parse(data)
    } else {
        let data = res || ''
        localStorage.setItem('movieType', JSON.stringify(data))
        return data
    }
}

function setMovieType(data) {
    localStorage.setItem('movieType', JSON.stringify(data))
}



// 获取订单数据

function getOrders(res) {
    let data = localStorage.getItem('orders')
    if (data && data !== 'undefined') {
        return JSON.parse(data)
    } else {
        let data = res || ''
        localStorage.setItem('orders', JSON.stringify(data))
        return data
    }
}

function setOrders(data) {
    localStorage.setItem('orders', JSON.stringify(data))
}


// 获取本地注册账户数据
function getMovieAccount() {
    let data = localStorage.getItem('movieAccount')
    if (data) {
        return JSON.parse(data)
    } else {
        let arr = [{
            uname: 'admin',
            upass: 'Ad1234',
            ticket: []
        }]
        localStorage.setItem('movieAccount', JSON.stringify(arr))
        return arr
    }
}

function setMovieAccount(data) {
    localStorage.setItem('movieAccount', JSON.stringify(data))
}

// 获取当前登录用户数据
function getCurrentAccount() {
    let data = localStorage.getItem('currentAccount') || ''
    if (data) {
        return JSON.parse(data)
    } else {
        // [当前/上次登录账户，是否自动登录，当前是否登录，选择的座位]
        let arr = ['', '', false, false, {
            "orderid": "",
            "userphone": "",
            "movieid": "",
            "cinemaid": "",
            "seats": "",
            "buytime": "",
            "playtime": "",
            "status": ""
        }]
        localStorage.setItem('currentAccount', JSON.stringify(arr))
        return arr
    }
}

function setCurrentAccount(data) {
    localStorage.setItem('currentAccount', JSON.stringify(data))
}

function isLogin() {
    return getCurrentAccount()[3]
}

function isMobile() {
    let flag = false;
    !(function() {
        const userAgent = navigator.userAgent
            // 验证是否为Android或iPhone
        const android = userAgent.match(/(Android);?[\s\/]+([\d.]+)?/)
        const iphone = userAgent.match(/(iPhone\sOS)\s([\d_]+)/)
            // 如果是Android或iPhone，则跳转至移动站点
        if (android || iphone) {
            flag = true
        }
    })()
    return flag
}

function showPass() {
    $('.eyes').on('click', 'img', function() {
        let src = $(this).attr('src')
        if (src.includes('close')) {
            $(this).attr('src', src.replace('close', 'open'))
            $(this).siblings('input[type="password"]').attr('type', 'text')
        } else {
            $(this).attr('src', src.replace('open', 'close'))
            $(this).siblings('input[type="text"]').attr('type', 'password')
        }
    })
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function getCountdow() {
    let addZero = (num) => num < 10 ? '0' + num : num
    let data = getCurrentAccount()
    let sec = parseInt((data[5] - +new Date()) / 1000)
    if (sec > 0) {
        let minute = addZero(parseInt(sec / 60))
        let second = addZero(parseInt(sec % 60))
        return [minute, second]
    } else {

        return false
    }
}

(function() {
    let timer = setInterval(function() {
        if (!getCountdow()) {
            let data = getCurrentAccount()
            let obj = {
                "orderid": "",
                "userphone": '',
                "movieid": '',
                "cinemaid": "",
                "seats": '',
                "buytime": "",
                "playtime": "",
                "status": ''
            }
            data[4] = obj
            setCurrentAccount(data)
            clearInterval(timer)
        }
    }, 1000)
})()