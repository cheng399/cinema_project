$(function() {
    let cinemaData = getCinema()
    let movies = getMovies()
    let str = location.search.substring(4, )
    let cinema = cinemaData.filter(e => e.id == str)
    cinema.forEach(e => e.movies = e.movies.map(elem => movies.filter(element => element.id === elem)[0]))
    $('#main .main-top h6').html(cinema[0].name)
    $('#main .main-top p').html(cinema[0].address)
    let movieStr = ''
    cinema[0].movies.forEach(e => {
        movieStr += `
        <li data-id="${e.id}">
            <img src="${e.imgSrc}" alt="">
            <div>
                <h6>${e.title.split(' ')[0]}</h6>
                <p class="price">￥${e.price || 38}起</p>
                <ul>
                    <li>13:00</li>
                    <li>15:00</li>
                    <li>17:00</li>
                    <li>19:00</li>
                    <li>21:00</li>
                </ul>
            </div>
        </li>
        `
    })
    $('#main .main-con').html(movieStr)

    $('#main .main-con').on('click', 'li', function() {
        location.href = `./detailPage.html?movieid=${$(this).data('id')}`
    })

    $('.back').on('click', function() {
        history.go(-1)
    })
})