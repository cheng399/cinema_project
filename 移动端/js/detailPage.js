$(function() {
            let id = location.search.substring(9, ) || '1292213'

            // 获取电影列表
            let movie = getMovies()

            // 获取点击的电影
            let movieObj = movie.filter(e => e.id === id)[0]
            console.log(movieObj)
                // 渲染电影图片
            $('#header').css('background-image', `url(${movieObj.posterSrc})`)
            $('#header .movie img').attr('src', movieObj.imgSrc)
                // 渲染电影名字
            let title = movieObj.title.split(' ')
            $('#header .movie .title').html(title[0])

            // 渲染电影类型
            let movieType = getMovieType()
            let typeArr = movieObj.movieType
            let newArr = []
            typeArr.map(e => movieType.some(elem => {
                if (elem.id === e) {
                    newArr.push(elem.name)
                    return true
                }
            }))
            $('#header .movie .type').html(newArr.join(','))

            $('#header .movie .duration').html(movieObj.duration)
            $('#header .movie .score').html(movieObj.score)
            $('.intro').html(movieObj.desc)
            $('#main .main-tab').on('click', 'li', function() {
                $(this).addClass('active').siblings().removeClass('active')
                $('.con >div').eq($(this).index()).stop().slideDown().siblings().stop().slideUp()
            })


            // 渲染电影院
            let cinemaData = getCinema()
            let cinemaStr = ''
            let num = 1
            cinemaData.forEach(e => {
                        cinemaStr += `
        <li>
            <h6>${e.name}</h6>
            <p class="address"><i>${getRandom(5, 30)}.0km•</i><span>${e.address}</span></p>
            <p class="price">英文2D•￥<span>${movieObj.price || 38}.00</span></p>
            <ul class="time" data-id="${e.id}">
                <li class="pastdue">11:00</li>
                <li class="pastdue">13:00</li>
                <li ${num++ === 1? `class="active"` : ''}>17:00</li>
                <li>15:00</li>
                <li>19:00</li>
                <li>20:00</li>
                <li>21:00</li>
            </ul>
        </li>
        `
    });
    $('.schedule .cinemas').html(cinemaStr)

    $('#main .cinemas ul').on('click', 'li', function() {
        if (!$(this).hasClass('pastdue')) {
            $('#main .cinemas ul .active').removeClass('active')
            $(this).addClass('active')
        }
    })

    $('.seat button').on('click',function() {
        if (isLogin()) {
            
            location.href = `./selectseat.html?movieid=${id}&cinemaid=${$('#main .cinemas ul .active').parent().data('id')}`
        } else {
            if (confirm('您未登录，是否前往登录？')) {
                location.href = `./login.html`
            }
        }
    })

    $('.back').on('click', function() {
        history.go(-1)
    })

    let list
    var point = {};
    let box = $('#main .schedule .box')
    box.on('touchstart', function(e) {
        var p = e.changedTouches[0];
        point.startX = p.clientX;
        point.startY = p.clientY;
    })
    box.on('touchmove', function(e) {
        var p = e.changedTouches[0];
        point.changeX = p.clientX - point.startX;
        point.changeY = p.clientY - point.startY;
        point.startX = p.clientX;
        point.startY = p.clientY;

        list = $(this).children('ul')
        if (Math.abs(point.changeY) < Math.abs(point.changeX)) {
            list.css('marginLeft', '+=' + point.changeX + 'px')
        }
    })
    box.on("touchend", function(e) {
        setTimeout(function() {
            if (parseInt(list.css('marginLeft')) > 0) {
                list.css('marginLeft', '0px')
            } else if (-parseInt(list.css('marginLeft')) > (list.children().length - 1) * parseInt(list.children().css('width'))) {
                list.css('marginLeft', -(list.children().length - 1) * parseInt(list.children().css('width')) + 'px')
            }
        }, 100)
    })
    box.on('click', 'li', function() {
        $(this).addClass('active').siblings().removeClass('active')
    })
})