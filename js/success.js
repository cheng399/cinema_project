$(function() {
    let data = getCurrentAccount()
    let movies = getMovies()
    let cinema = getCinema()
        // 渲染图片
    $('.sessions .details img').attr('src', movies.filter(e => e.id === data[4].movieid)[0]['imgSrc'])

    // 渲染标题
    let title = movies.filter(e => e.id === data[4].movieid)[0]['title']
    title = /[\S]+/.exec(title)
    $('.sessions .details h6').html(`《${title[0]}》`)

    // 渲染时间
    let dataArr = data[4].playtime.split('-')
    $('.sessions .details .time').html(`${dataArr[1]}月${dataArr[2]}日 22:00`)

    // 渲染电影院
    let str = cinema.filter(e => e.id == data[4].cinemaid)[0].name
    $('.sessions .details .cinema').html(str)

    // 渲染座位
    let seat = data[4]['seats'].split(',')
    let seatStr = seat.join(' ')
    $('.sessions .details .seat').html(seatStr)

    $('.sessions .details .state').html(data[4].status)

    $('.sessions .details button').on('click', function() {
        // location.href = './success.html'
    })
})