$(function() {
    let cinemaData = getCinema()
    let movies = getMovies()
    let movieType = getMovieType()
        // 获取点击的影片ID
    let str = location.search
    str = str === '' ? '?movieid=1292213&cinemaid=1' : str
    let movieid = (str.split('&')[0].split('=')[1]) || '1292213'
    let cinemaid = (str.split('&')[1].split('=')[1]) || '1'


    // 获取点击的电影院及电影
    let cinema = cinemaData.filter(e => e.id == cinemaid)
    let movieData = getMovies()
    let movie = movies.filter(e => e.id == movieid)
    cinema.forEach(e => e.movies = e.movies.map(elem => movieData.filter(element => element.id === elem)[0]))

    let text = ''
    cinema.forEach(e => {
        text += `
        <h5 class="title">${e.name}</h5>
                    <p class="address">${e.address}</p>
                    <p class="tel">电话：${e.phone}</p>
                    <div class="serve">
                        <p>影院服务</p>
                        <ul>
                            <li>未取票用户放映前3小时可改签</li>
                            <li>免押金</li>
                            <li>一名成人仅可携带一名不足1.3米儿童无座免费观影（巨幕厅、情侣厅除外），...</li>
                            <li>影院有免费WiFi</li>
                            <li>商场内可停车。（检票口可领取2小时免费停车券）</li>
                        </ul>
                    </div>
        `
    });

    $('.main-top .main-top-text').html(text)
    $('.main-top .w img').attr('src', cinema[0].img_src)
    $('.main-body .nav .cinema').html(cinema[0].name)

    // 渲染图片
    let slideStr = ''
    cinema[0].movies.forEach(e => {
        if (e.id == movie[0].id) {
            slideStr += `<li class="active" data-id="${e.id}"><img src="${e.imgSrc}""></li>`
        } else {
            slideStr += `<li data-id="${e.id}"><img src="${e.imgSrc}""></li>`
        }
    })
    $('.slideshow ul').html(slideStr)

    $('.slideshow ul').on('click', 'li', function() {
        $(this).addClass('active').siblings().removeClass('active')
        let movie = movies.filter(e => e.id == $(this).data('id'))
        loadCon_head(movie)
    })

    loadCon_head(movie)

    function loadCon_head(movie) {
        let str = ''
        if (Array.isArray(movie[0].movieType)) {
            movie.forEach(e => {
                console.log(e)
                let arr = e.movieType.map(elem => {
                    return movieType.filter(element => element.id == elem)[0].name
                })
                e.movieType = arr.join(' ')
            })
        }
        movie.forEach(e => {
            str += `
            <h6><span class="title">${e.title.split(' ')[0]}</span><i class="score">${e.score}</i><i>分</i></h6>
            <p>
                <span class="duration">${e.duration}</span> <span class="movieType">${e.movieType}</span><span class="actors">${e.actors.replace(/\//g,' ')}</span>
            </p>
            <ul class="tab">
                <li class="active">今天5月9日</li>
                <li>周六5月14日</li>
            </ul>
            `
        })
        $('.body-content .con-head').html(str)
    }

    //获取网络数据，比如电影院
    let url = cinema[0].address
    let map = new BMapGL.Map('map');
    map.centerAndZoom(new BMapGL.Point(116.331398, 39.897445), 12);
    //创建地址解析器实例
    let myGeo = new BMapGL.Geocoder();
    // 将地址解析结果显示在地图上，并调整地图视野
    myGeo.getPoint(url, function(point) {
        if (point) {
            map.centerAndZoom(point, 16);
            map.addOverlay(new BMapGL.Marker(point, { title: cinema[0].address }))
        } else {
            alert('您选择的地址没有解析到结果！');
        }
    }, '成都市');

    $('.sell').on('click', function() {
        location.href = "./selectseat.html?movieid=" + $('.slideshow ul').children('.active').data('id') + "&cinemaid=" + cinemaid
    })
})