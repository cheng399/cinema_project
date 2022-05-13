$(function() {

    movie = getMovies()
        // 渲染列表
    let str1 = ''
    let str2 = ''
        // 渲染电影类型
    let movieType = getMovieType()
    movie.forEach(e => {
        let arr = e.movieType.map(elem => {
            return movieType.filter(element => element.id == elem)[0].name
        })
        e.movieType = arr.join(',')
    })

    movie.forEach((elem, index, arr) => {
        if (index < 8) {
            str1 += `
                <li data-id="${elem.id}">
                <img src="${elem.imgSrc}" alt="">
                <div>
                    <h5 class="title">${elem.title.split(' ')[0]}</h5>
                    <div class="nature">
                        <p class="type">${elem.movieType}</p>
                        <p class="duration">${elem.duration}</p>
                        <p class="score">${elem.score}</p>
                        <span>立即购票</span>
                    </div>
                </div>
            </li>`
        }
        if (index >= 8 && index < 16) {
            str2 += `
                <li data-id="${elem.id}">
                <img src="${elem.imgSrc}" alt="">
                <div>
                    <h5 class="title">${elem.title.split(' ')[0]}</h5>
                    <div class="nature">
                        <p class="type">动作,冒险,科幻动作,冒险,科幻</p>
                        <p class="duration">115分钟</p>
                        <p class="score">${elem.score}</p>
                        <span>立即购票</span>
                    </div>
                </div>
            </li>`
        }
    })
    $('.main-showing').html(str1)
    $('.main-notshow').html(str2)

    $('#main').on('click', 'li', function() {
        location.href = `./detailPage.html?movieid=${$(this).data('id')}`
    })

    $('#header .tab').on('click', 'li', function() {
        $(this).addClass('active').siblings().removeClass('active')
            // $('#main ul').eq($(this).index()).stop().slideDown().siblings().stop().slideUp()
        $('#main ul').eq($(this).index()).stop().show().siblings().stop().hide()
    })

    $('.back').on('click', function() {
        history.go(-1)
    })
    let str = location.search.substring(1, )
    if (str === 'notshow') {
        $('#header .tab li').eq(1).click()
    }
})