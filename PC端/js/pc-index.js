isMobile() && (location.href = '../移动端/index.html')
$(function() {
    // 轮播图模块
    slideshow('.slideshow .list')

    function slideshow(select) {
        let ul = $(select)
        let index = 0
        let timer
            // 克隆第一张图片
        ul.append(ul.children().first().clone(true))

        // 设置每张轮播图的位置
        ul.children().each((index, elem) => {
            $(elem).css('left', index * 20 + '%')
        })

        // 鼠标
        let length = ul.children().length
        ul.siblings('.point').on('mouseenter', 'li', function() {
            $(this).addClass('active').siblings().removeClass('active')
            ul.stop().animate({
                left: `-${$(this).index() * 100}%`
            })
            index = $(this).index()
        })

        // 鼠标移入则停止轮播
        ul.hover(() => clearInterval(timer), () => timer = setInterval(auto, 2000))

        // 点击上一个
        ul.siblings('.prev').on('click', function() {
            clearInterval(timer)
            index--
            if (index === -1) {
                ul.css('left', `-${length - 1}00%`)
                index = (length - 2)
            }
            ul.stop().animate({
                left: `-${index * 100}%`
            }, 2000)
            ul.next().children().eq(index).addClass('active').siblings().removeClass('active')
            timer = setInterval(auto, 4000)
        })

        // 点击下一个
        ul.siblings('.next').on('click', function() {
            clearInterval(timer)
            index++
            if (index === (length)) {
                ul.css('left', 0)
                index = 1
            }
            ul.stop().animate({
                left: `-${index * 100}%`
            }, 2000)
            ul.next().children().eq(index === length - 1 ? 0 : index).addClass('active').siblings().removeClass('active')
            timer = setInterval(auto, 4000)
        })

        function auto() {
            ul.siblings('.next').click()
        }
        timer = setInterval(auto, 4000)
    }
    let time = 500
    let cinemaData = getCinema()
    $.ajax({
        type: 'get',
        url: 'https://www.fastmock.site/mock/bb4157f45a0b5ffdcb3f6d984517a6c0/woniuMovie/getAllOperas',
        success: function(res) {
            if (res.operas) {
                if (JSON.stringify(cinemaData) !== JSON.stringify(res.operas)) {
                    setCinema(res.operas)
                    cinemaData = getCinema(res.operas)
                    loadSelect()
                }
                cinemaData.forEach(e => e.movies = e.movies.map(elem => movieData.filter(element => element.id === elem)[0]))
                time = 0
            }
        }
    })
    if (cinemaData) {
        loadSelect()
    }

    function loadSelect() {
        let str = '<option>选择影院</option>'
        cinemaData.forEach(elem => str += `<option>${elem.name}</option>`);
        $('.option select:first').html(str)
    }
    $('.home_main_header .option').on('change', 'select:first', function() {
        setTimeout(() => {
            if ($(this).val() !== '选择影院') {
                let str = ''
                cinemaData.filter(e => e.name === $(this).val())[0].movies.forEach(elem => {
                    str += `<option value="${elem.id}">${elem.title}</option>`
                });
                $('.option select:eq(1)').html(str)
            } else {
                $('.option select:eq(1)').html('<option>选择电影</option>')
            }
        }, time)
    })
    $('.buy').on('click', function() {
        let cinema = $('.option select:eq(0)').val()
        let movieid = $('.option select:eq(1)').val()
        let cinemaid
        cinemaData.some(e => {
            if (e.name === cinema) {
                cinemaid = e.id
                return true
            }
        })
        if (movieid && cinemaid) {
            location.href = "./html/selectseat.html?movieid=" + movieid + "&cinemaid=" + cinemaid
        }
    })

    $('#header .h-bottom .fr input').on('focus', function() {
        let name = movieData.map(e => e.title.split(' ')[0])
            // console.log(name)
        let str = ``
        name.forEach(e => {
            str += `
            <option value="${e}"></option>
            `
        })
        $('#search').html(str)
    })
    $('#header .h-bottom .fr button').on('click', function() {
        let value = $('#header .h-bottom .fr input').val()
        let id
        movieData.some(e => {
            if (value === e.title.split(' ')[0]) {
                id = e.id
                return true
            }
        })
        if (id) {
            location.href = './html/detailPage.html?movieid=' + id
        } else {
            alert('无此电影')
        }
    })
})


function loadRight() {
    // 渲染右侧
    let random = getRandom(0, movieData.length - 1)
    $('.activity .top .pic img').attr('src', movieData[random].imgSrc)
    $('.activity .top h5').html(movieData[random].title)
    $('.activity .top .time').html(`上映时间：${movieData[random].release.substr(0,10)}`)
    $('.activity .top .see span').html(`${getRandom(100000, 999999)}`)

    random = getRandom(0, movieData.length - 1)
    $('.activity .bottom .fl img').attr('src', movieData[random].posterSrc)
    $('.activity .bottom .fl .title').html(movieData[random].title)
    $('.activity .bottom .fl .time span').html(movieData[random].release.substr(0, 10).replace('-', '年').replace('-', '月') + '日上映')

    random = getRandom(0, movieData.length - 1)
    $('.activity .bottom .fr img').attr('src', movieData[random].posterSrc)
    $('.activity .bottom .fr .title').html(movieData[random].title)
    $('.activity .bottom .fr .time span').html(movieData[random].release.substr(0, 10).replace('-', '年').replace('-', '月') + '日上映')

    random = getRandom(0, movieData.length - 1)
    $('.hots .first img').attr('src', movieData[random].posterSrc)
}