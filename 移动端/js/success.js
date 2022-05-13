$(function() {
    let data = getCurrentAccount()
    let movies = getMovies()
    let cinema = getCinema()

    let movieObj = movies.filter(e => e.id === data[4].movieid)[0]
    let src = movieObj['imgSrc']
    $('#main .film .movie img').attr('src', src)
        // 渲染标题
    let title = movieObj['title']
    title = /[\S]+/.exec(title)
    $('#main .film .movie .title').html(title[0])

    // 渲染电影院
    let str = cinema.filter(e => e.id == data[4].cinemaid)[0].name
    $('#main .film .movie .cinema').html(str)

    // 渲染座位
    let seat = data[4]['seats'].split(',')
    let seatStr = ''
    seat.forEach(e => seatStr += `<span>${e}</span>`);
    $('#main .details .seats').html(seatStr)
    $('#main .details .count').html(seat.length)
    $('#main button').on('click', function() {
        location.href = '../index.html'
    })
})