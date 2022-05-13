$(function() {
    let str = location.search.substring(4).split('&')
    let movies = getMovies()
    let cinemas = getCinema()

    let movieObj = movies.filter(e => e.id == str[0])[0]
    let cinemaObj = cinemas.filter(e => e.id == str[1])[0]
    console.log(movieObj)
    console.log(cinemaObj)

    let text = `
    <img src="${movieObj.imgSrc}">
                <div>
                    <h5 class="title">${movieObj.title.split(' ')[0]}</h5>
                    <p class="cinema">${cinemaObj.name}</p>
                    <p>2022-05-19</p>
                    <p class="seats">
                        <span>F4</span>
                        <span>F5</span>
                        <span>F6</span>
                    </p>
                </div>
    `
    $('#main .film .movie').html(text)

    $('.back').on('click', function() {
        history.go(-1)
    })

})