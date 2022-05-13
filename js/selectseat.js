$(function() {
    let search = location.search
    search = search === '' ? '?movieid=1292213&cinemaid=1' : search
    let movieid = (search.split('&')[0].split('=')[1]) || '1292213'
    let cinemaid = (search.split('&')[1].split('=')[1]) || '1'

    let cinemaData = getCinema()
    let cinema = cinemaData.filter(e => e.id == cinemaid)[0]

    // 获取电影列表
    let movie = getMovies()

    // 获取点击的电影
    let movieObj = movie.filter(e => e.id === movieid)[0]

    let movieType = getMovieType()
    let typeArr = movieObj.movieType
    let newArr = []
    typeArr.map(e => movieType.some(elem => {
        if (elem.id === e) {
            newArr.push(elem.name)
            return true
        }
    }))

    $('.content-seat .movies .pic img').attr('src', movieObj.imgSrc)
    $('.content-seat .movies .name').html(`
    <h4 class="title">${movieObj.title.split(' ')[0]}</h4>
    <p class="types">类型:<span>${newArr.join(',')}</span></p>
    <p class="times">时长:<span>${movieObj.duration}</span></p>
    `)

    // 补零函数
    let addZero = (num) => num < 10 ? '0' + num : num


    // 渲染时间
    let dd = new Date()
    dd.setDate(dd.getDate() + 15)
    let dateArr = dd.toLocaleDateString().split('/').map(e => addZero(e))

    $('.content-seat .cinema .address span').html(cinema.name)
    $('.content-seat .cinema .session span').html(`${dateArr[1]}月${dateArr[2]}日 22:00`)
    let moviePrice = movieObj.price || 38
    $('.content-seat .cinema .price span').html(`￥${moviePrice}/张`)

    if (isMobile()) {
        $('#main .title').html(movieObj.title.split(' ')[0])
        $('#main .address').html(cinema.name)
    }

    let mobile = isMobile()
    let seat = $('.content-seat ul.seat')
    let str = ''
    for (let i = 0; i < (mobile ? 6 : 12); i++) {
        str += '<li></li>'
    }
    seat.html(str)
    let arr = ['A', 'B', 'C', 'D', 'E', 'F']
    for (let i = 1; i <= (mobile ? 6 : 12); i++) {
        let str = ''
        for (let j = 1; j <= (mobile ? 6 : (i > 6 ? 11 : 16)); j++) {
            str += `<span data-row=${mobile ? arr[i - 1]: i} data-col=${j}>${mobile ? arr[i - 1] + j : ''}</span>`
        }
        seat.children().eq(i - 1).html(str)
    }
    let ticketArr = []
    if (mobile) {
        for (let i = 4; i <= 5; i++) {
            for (let j = 0; j <= 3; j++) {
                if (i !== 5 || j !== 3) {
                    seat.children().eq(i).children().eq(j).addClass('sell')
                }
            }
        }
        for (let j = 3; j <= 5; j++) {
            seat.children().eq(5).children().eq(j).addClass('select')
            ticketArr.push(['F', j + 1])
        }
    } else {
        seat.children().eq(11).children().eq(9).addClass('sell')
        seat.children().eq(11).children().eq(10).addClass('sell')
        for (let i = 0; i < 3; i++) {
            for (j = 0; j < 16; j++) {
                if (i === 2 && j > 3 && j < 12) continue
                seat.children().eq(i).children().eq(j).addClass('sell')
            }
        }
    }


    seat.on('click', 'span', function() {
        if (!$(this).hasClass('sell')) {
            if (!$(this).hasClass('select')) {
                if (ticketArr.length < 5) {
                    $(this).addClass('select')
                    ticketArr.push([$(this).data('row'), $(this).data('col')])
                }
            } else {
                $(this).removeClass('select')
                let row = $(this).data('row')
                let col = $(this).data('col')
                ticketArr.some((e, i) => {
                    if (e[0] === row && e[1] === col) {
                        ticketArr.splice(i, 1)
                        return true
                    }
                })
            }
            price()
        }
    })
    price()

    function price() {
        if (ticketArr.length) {
            let str = ''
            ticketArr.forEach(elem => {
                str += mobile ? `<span>${elem[0]}${elem[1]}</span>` : `<span>${elem[0]}行${elem[1]}列</span>`
            })
            $('.ticket div').html(str)
        } else {
            if (mobile) $('.ticket div').html('')
            $('.con_right .ticket div').html(`一次最多选5个座位
                <p>请<i>点击左侧</i>座位图选择座位</p>`)
        }
        $('.totals span').html((ticketArr.length * moviePrice).toFixed(2))
    }
    let tel = $('.verify input[type="tel"]')
    tel.on('input', function() {
        $(this).val(`${$(this).val().trim()}`)
        if (!/^1[3-9]\d{9}$/.test($(this).val())) {
            $(this).next().html('请输入正确的手机号')
            $('.verify button').css('background-color', '#dedede').prop('disabled', true)
        } else {
            $(this).next().html('')
        }
    })
    let timer
    $('.verify span').on('click', function() {
        if (!isLogin()) return alert('您还没有登录,请先去登录吧!')
        if (!/^1[3-9]\d{9}$/.test(tel.val())) {
            tel.next().html('请输入正确的手机号')
        } else {
            if (!timer) {
                $('.verify input[type="text"]').prop('readonly', false)
                let i = 60
                $(this).html(`${i}秒后重新获取`)
                timer = setInterval(() => {
                    i--
                    if (i === 0) {
                        clearInterval(timer)
                        timer = undefined
                        $(this).html(`获取验证码`)
                        return
                    }
                    $(this).html(`${i}秒后重新获取`)
                }, 1000)
            }
        }

    })
    $('.verify input[type="text"]').on('input', function() {
        $(this).val($(this).val().trim())
        if ($(this).val().length === 6 && /^1[3-9]\d{9}$/.test(tel.val())) {
            $('.content-seat .verify button').css('background-color', '#f99135').prop('disabled', false)
        } else {
            $('.verify button').css('background-color', '#dedede').prop('disabled', true)
        }
    })

    // 点击购买
    $('.verify').on('click', 'button', function() {
        if (!isLogin()) {
            // alert('您还没有登录,请先去登录吧!')
            if (isMobile()) {
                // location.href = `./login.html`
            }
            // return
        }
        if (ticketArr.length) {
            let data = getCurrentAccount()
            if (data[4].status === '待支付') {
                if (confirm('您有未支付的订单，是否前往支付？')) return location.href = "./toPay.html"
                if (!confirm('您有未支付的订单，继续购买则取消该订单，是否继续购买？')) return
            }

            let arr = []
            if (isMobile()) {
                ticketArr.forEach(e => {
                    arr.push(e[0] + e[1])
                })
            } else {
                ticketArr.forEach(e => {
                    arr.push(e[0] + '排' + e[1] + '列')
                })
            }
            let dd = new Date()
            dd.setDate(dd.getDate() + 15)

            let obj = {
                "orderid": "25888008",
                "userphone": tel.val() || 13888888888,
                "movieid": movieid,
                "cinemaid": cinemaid,
                "seats": arr.join(','),
                "buytime": new Date().toLocaleDateString().split('/').map(e => addZero(e)).join('-'),
                "playtime": dd.toLocaleDateString().split('/').map(e => addZero(e)).join('-'),
                "status": '待支付'
            }
            data[4] = obj
            data[5] = +new Date() + 840000
            console.log(data)
            setCurrentAccount(data)
            location.href = "./toPay.html"
        } else {
            alert('请先选择座位吧！')
        }
    })

    $('.back').on('click', function() {
        history.go(-1)
    })
})