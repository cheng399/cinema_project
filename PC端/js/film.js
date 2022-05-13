$(function() {
    // 获取电影列表
    let movie = getMovies()

    let movieType = getMovieType()

    // 渲染上方筛选
    let typeArr = movieType.map(e => e.name)

    let typeStr = '<li class="active">全部</li>'
    typeArr.forEach(e => typeStr += `<li>${e}</li>`);
    $('.movie-select .type').html(typeStr)

    let placeArr = movie.map(e => e.region).join(' ').split(' ')
    placeArr = [...new Set(placeArr)]

    let placeStr = '<li class="active">全部</li>'
    placeArr.forEach(e => placeStr += `<li>${e}</li>`);
    $('.movie-select .place').html(placeStr)

    let yearArr = ['2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2000-2010', '90年代', '80年代', '70年代', '更早']

    let yearStr = '<li class="active">全部</li>'
    yearArr.forEach(e => yearStr += `<li>${e}</li>`);
    $('.movie-select .year').html(yearStr)

    // 渲染下方电影列表
    movie.forEach(e => {
        let arr = e.movieType.map(elem => {
            return movieType.filter(element => element.id == elem)[0].name
        })
        e.movieType = arr.join('/')
    })

    function loadList(data) {
        let str = ''
        data.forEach(e => {
            str += `
            <li data-id="${e.id}"><img src="${e.imgSrc}" alt=""><span>${e.title.split(' ')[0]}</span><i>${e.score}</i>
                <div class="detail">
                    <img src="${e.posterSrc}" alt="">
                    <div>
                        <h6>${e.title.split(' ')[0]}<i>${e.score}</i></h6>
                        <p class="type">类型:<span>${e.movieType}</span></p>
                        <p class="actors">主演:<span>${e.actors.replace(/\s/g,'')}</span></p>
                        <p class="release">上映时间:<span>${/[0-9-]+/.exec(e.release)[0]}</span></p>
                    </div>
                </div>
            </li>
            `
        })
        return str
    }
    $('.list-middle').html(loadList(movie))

    // 根据搜索条件渲染页面
    let timer
    $('#header .h-bottom .fr button').on('click', function() {
        clearTimeout(timer)
        timer = setTimeout(() => {
            let reg = new RegExp($(this).prev().val())
            let arr = movie.filter(e => reg.test(e.title.split(' ')[0]))
            $('.list-middle').html(loadList(arr))
            $('ul.list-middle li').hover(function() {
                $(this).children('.detail').stop().fadeToggle()
            })
        }, 200)
    })
    $('#header .h-bottom .fr input').on('input', function() {
        if ($(this).val() === '') {
            $('.list-middle').html(loadList(movie))
            $('ul.list-middle li').hover(function() {
                $(this).children('.detail').stop().fadeToggle()
            })
        }
    })

    // hover时显示详情
    $('ul.list-middle li').hover(function() {
        $(this).children('.detail').stop().fadeToggle()
    })

    // 根据筛选条件渲染页面
    $('.movie-select ul').on('click', 'li', function() {
        $(this).addClass('active').siblings().removeClass('active')

        let typeHtml = $('.type .active').html()
        let placeHtml = $('.place .active').html()
        typeHtml = typeHtml === '全部' ? '' : typeHtml
        placeHtml = (placeHtml === '全部') ? '' : placeHtml
        let typeReg = new RegExp(typeHtml)
        let placeReg = new RegExp(placeHtml)
        let arr = movie.filter(e => {
            return typeReg.test(e.movieType) && placeReg.test(e.region)
        })
        $('.list-middle').html(loadList(arr))
        $('ul.list-middle li').hover(function() {
            $(this).children('.detail').stop().fadeToggle()
        })
    })

    $('.movie-list .list-top').on('click', 'span', function() {
        $(this).addClass('active').siblings().removeClass('active')
    })

    $('.movie-list .list-middle').on('click', 'li', function() {
        location.href = "./detailPage.html?movieid=" + $(this).data('id')
    })
})