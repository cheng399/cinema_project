$(function() {
    // 补零函数
    let addZero = (num) => num < 10 ? '0' + num : num

    let data = getCurrentAccount()
    let movies = getMovies()
    let cinema = getCinema()
        // 倒计时
    let timer = setInterval(function() {
        countdow()
    }, 1000)
    countdow()

    function countdow() {
        let time = getCountdow()
        if (time) {
            $('.countdown .min').html(time[0])
            $('.countdown .sec').html(time[1])
        } else {
            $('.countdown div').html('您已超时,请重新选择座位吧!')
            $('.content-toPay .pay button').css('background', '#999').prop('disabled', 'true')
            clearInterval('timer')
        }
    }
    if (data[4].status === '待支付') {
        // 渲染标题
        let title = movies.filter(e => e.id === data[4].movieid)[0]['title']
        title = /[\S]+/.exec(title)
        $('.sessions .movietitle').html(`《${title[0]}》`)

        // 渲染时间
        let dateArr = data[4].playtime.split('-')
        $('.sessions .time').html(`${dateArr[1]}月${dateArr[2]}日 22:00`)

        // 渲染电影院
        let str = cinema.filter(e => e.id == data[4].cinemaid)[0].name
        $('.sessions .cinema').html(str)

        // 渲染座位
        let seat = data[4]['seats'].split(',')
        let seatStr = ''
        seat.forEach(e => seatStr += `<li>${e}</li>`);
        $('.sessions .seat').html(seatStr)

        $('.content-toPay .pay .money').html(seat.length * 38)
    } else {
        $('.content-toPay .sessions tbody').html('')
    }
    $('.content-toPay .pay button').on('click', function() {
        data[4].status = '待使用'
        data.splice(5, 1)
        let account = getMovieAccount()
        account.some((e, i, arr) => {
            if (e.uname === data[0]) {
                arr[i].ticket.push(data[4])
                return true
            }
        })[0]
        setCurrentAccount(data)
        setMovieAccount(account)
        location.href = './success.html'
    })
})