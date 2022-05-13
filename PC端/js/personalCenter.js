$(function() {
    if (isLogin()) {

        let data = getCurrentAccount()
        let movies = getMovies()
        let cinemas = getCinema()
        let addZero = (num) => num < 10 ? '0' + num : num

        let ticket = ''
        let account = getMovieAccount()
        let newArr = []
        account.some(e => {
            if (e.uname === data[0]) {
                console.log(e.ticket)
                newArr = [...e.ticket]
                return true
            }
        })

        if (data[4].status === '待支付') {
            ticket += loadOrder(data[4])
        }

        if (newArr.length) {
            newArr.forEach(e => {
                ticket += loadOrder(e)
            })
        }
        $('#myOrder ul').html(ticket)

        function loadOrder(arr) {
            let str = ''
            let orderid = arr.orderid
            let movie = movies.filter(e => e.id === arr.movieid)[0]
            let cinema = cinemas.filter(e => e.id == arr.cinemaid)[0]
            let dateArr = arr.playtime.split('-')
            let flag = arr.status === '待支付'
            str += `
                <li class="order">
                    <div class="order-top">
                        <p><span class="time">${arr.buytime}</span>蜗牛订单号：<span class="orderNum">${orderid}</span></p>
                        <button class="delete"></button>
                    </div>
                    <div class="details">
                        <div class="movie">
                            <img src="${movie.imgSrc}" alt="">
                            <div>
                                <h6>《${movie.title.split(' ')[0]}》</h6>
                                <p class="cinema">${cinema.name}</p>
                                <p>2号厅 <span class="seat">${arr.seats}</span></p>
                                <span class="time">${dateArr[1]}月${dateArr[2]}日 22:00</span>
                            </div>
                        </div>
                        <span>￥${movie.price || 38}</span>
                        <span class="state">${arr.status}</span>
                        <button class="${flag?'payed':'take'}"></button>
                    </div>
                </li>
                `
            return str
        }

        $('#myOrder ul .payed').on('click', function() {
            location.href = './toPay.html'
        })
        $('.order .delete').on('click', function() {
            if (confirm('是否确认删除此订单?')) $(this).parents('li').remove()
        })

        $('#main .main_left li').on('click', function() {
            $(this).addClass('active').siblings().removeClass('active')
            $('#main .main_right').children().eq($(this).index()).stop().show().siblings().stop().hide()
        })
    } else {
        if (confirm('您未登录,是否前往登录?')) {
            $('#header .h-top .loginbtn').click()
        } else {
            location.href = "../index.html"
        }
    }
    $('.shade .close').on('click', function() {
        location.reload()
    })
    $('#header .exit').on('click', function() {
        location.reload()
    })
})