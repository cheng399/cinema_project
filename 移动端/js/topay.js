$(function() {
    let data = getCurrentAccount()
    let movies = getMovies()
    let cinema = getCinema()

    let movieObj = movies.filter(e => e.id === data[4].movieid)[0]
    let src = movieObj['imgSrc']
    $('#header .movie img').attr('src', src)
        // 渲染标题
    let title = movieObj['title']
    title = /[\S]+/.exec(title)
    $('#header .title').html(title[0])

    // 渲染电影院
    let str = cinema.filter(e => e.id == data[4].cinemaid)[0].name
    $('#header .cinema').html(str)

    // 渲染座位
    let seat = data[4]['seats'].split(',')
    let seatStr = ''
    seat.forEach(e => seatStr += `<span>${e}</span>`);
    $('#main .seat p').html(seatStr)
    $('#main .seat .count').html(seat.length)
    let price = seat.length * (movieObj['price'] || 38)
    $('#main .price  div:first span').html(`￥${price}.00`)
    $('#main .topay span').html(`￥${price + 3}.00`)
    $('#pay .price span').html(`￥${price + 3}.00`)
    $('.back').on('click', function() {
        history.go(-1)
    })

    $('#main .topay button').on('click', function() {
        $('#pay').fadeIn()
    })
    $('#pay .exitpay i').on('click', function() {
        $('#pay').fadeOut()
    })
    $('#pay').on('click', 'button', function() {
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
        location.href = "./success.html"
    })
})