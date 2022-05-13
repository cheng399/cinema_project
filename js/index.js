let movieData
$(function() {
    let mobile = isMobile()
    movieData = getMovies()
        // 获取电影数据
    $.ajax({
        type: 'get',
        url: 'https://www.fastmock.site/mock/bb4157f45a0b5ffdcb3f6d984517a6c0/woniuMovie/getAllMovies',
        success: function(res) {
            if (res.movies) {
                if (JSON.stringify(movieData) !== JSON.stringify(res.movies)) {
                    setMovies(res.movies)
                    movieData = getMovies(res.movies)
                    loadList();
                    !mobile && loadRight()
                }
            }
        }
    })

    if (movieData) {
        loadList();
        !mobile && loadRight()
    } else {
        $('.movielist').html('<img src="./images/loading.gif" class="loading">')
    }

    $('#main .movielist').on('click', 'li', function() {
        location.href = `./html/detailPage.html?movieid=${$(this).data('id')}`
    })

    let movieType = getMovieType()
        // 获取电影类型
    $.ajax({
        type: 'get',
        url: 'https://www.fastmock.site/mock/bb4157f45a0b5ffdcb3f6d984517a6c0/woniuMovie/getAllTypes',
        success: function(res) {
            if (res.types) {
                if (JSON.stringify(movieType) !== JSON.stringify(res.types)) {
                    setMovieType(res.types)
                }
            }
        }
    })

    $('.showing .more').on('click', function() {
        loadList(movieData.length, $('.notshow .movielist li').length)
    })

    $('.notshow .more').on('click', function() {
        loadList($('.showing .movielist li').length, movieData.length)
    })

    function loadList(num1 = 8, num2 = 8) {
        // 渲染列表
        let str1 = ''
        let str2 = ''
        movieData.forEach((elem, index, arr) => {
            if (index < num1) {
                str1 += `<li data-id="${elem.id}"><div class="pic"><img src="${elem.imgSrc}" title="${elem.desc}"></div>
                    <p><span class="title">${elem.title.split(' ')[0]}</span><i class="score fr">${elem.score}</i></p></li>`
            }
            if (index >= arr.length - num2) {
                str2 += `<li data-id="${elem.id}"><div class="pic"><img src="${elem.imgSrc}" title="${elem.desc}"></div>
                    <p><span class="title">${elem.title.split(' ')[0]}</span><i class="score fr">${elem.score}</i></p></li>`
            }
        })
        $('.showing .movielist').html(str1)
        $('.notshow .movielist').html(str2)
    }
})