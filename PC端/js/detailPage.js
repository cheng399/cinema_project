$(function() {
    // 获取点击的影片ID
    let id = location.search.substring(9, ) || '1292213'

    // 获取电影列表
    let movie = getMovies()

    // 获取点击的电影
    let movieObj = movie.filter(e => e.id === id)[0]

    // 渲染电影图片
    $('.main-top img').attr('src', movieObj.imgSrc)
    $('.main-top img').on('click', function() {
        location.href = movieObj.trailerLink
    })

    // 渲染电影标题及副标题
    let title = movieObj.title.split(' ')
    $('.main-top .main-top-text .title').html(title[0])
    if (title.length !== 1) {
        title.shift()
    } else {
        title[0] = pinyin.getFullChars(title[0])
    }
    $('.main-top .main-top-text .subhead').html(title.join(' '))

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
    $('.main-top .main-top-text .nature .type').html(newArr.join(' '))

    $('.main-top .main-top-text .nature .duration').html(`${movieObj.region} / ${movieObj.duration}`)
    let release = /\S+/.exec(movieObj.release)[0]
    let date = /[0-9-]+/.exec(release)[0]
    let txt = /[\u4e00-\u9fa5]+/.exec(release)[0]
    $('.main-top .main-top-text .nature .release').html(`${date} 08:00${txt}上映`)

    $('#introduce .synopsis p').html(`${movieObj.desc}`)

    // 演职人员
    $('.dir-left span').html(movieObj.director)

    // 右侧预告片渲染
    let random1 = getRandom(0, movie.length - 4)
    let str1 = ''
    let num = 1
    movie.forEach((e, i) => {
        if (i > random1 && i <= random1 + 3) {
            str1 += `
            <li>
                <img src="${e.posterSrc}"  data-id="${e.id}"><i>${num++}</i>
                <div class="trai">
                    <p>《${e.title.split(' ')[0]}》为何被捧为华语爱情片第一神作</p><span>${getRandom(10, 999)}.9万</span>
                </div>
            </li>
                `
        }
    })

    $('.main-right .prevue ul').html(str1)
    $('.main-right .prevue ul img').on('click', function() {
        location.href = movie.filter(e => e.id == $(this).data('id'))[0].trailerLink
    })

    // 右侧相关电影渲染
    let random2 = getRandom(0, movie.length - 10)
    let str2 = ''
    movie.forEach((e, i) => {
        if (i > random2 && i <= random2 + 9) {
            str2 += `
            <li>
                <img src="${e.imgSrc}" alt="">
                <p>${e.title.split(' ')[0]}</p>
                <span>${e.score}</span>
            </li>
        `
        }
    })
    $('.main-right .correlation ul').html(str2)

    // 评论列表渲染
    let comments = movieObj.comments
    addComment(comments)

    function addComment(data) {
        let commentsStr = ''
        data.forEach((e, i) => {
            commentsStr += `
            <li class="list-item">
                <img src="../images/user${i % 3 + 1}.png" alt="">
                <div>
                    <p>Hp</p>
                    <div class="time">
                        <span>23小时前</span>
                        <span>${getRandom(100, 10000)}</span>
                    </div>
                    <p>${e}
                    </p>
                </div>
            </li>`
        });
        $('.comment-list').html(commentsStr)
    }
    $('.comment textarea').on('input', function() {
        $(this).val($(this).val().trim())
    })
    $('.comment textarea').on('keydown', function(e) {
        if (e.originalEvent.keyCode == '13') {
            $('.comment .addComment').click()
        }
    })
    $('.comment .addComment').on('click', function() {
            if ($(this).prev().val() === '') return alert('内容不能为空')
            comments.push($(this).prev().val())
            addComment(comments)
            $('.comment .comment-shade .close').click()
            $(this).prev().val('')
        })
        // 左侧点击切换
    $('.main-center .tab').on('click', 'li', function() {
        $(this).addClass('active').siblings().removeClass('active')
        $('.main-center .content').children().eq($(this).index()).stop().slideDown().siblings().stop().slideUp()
    })

    // 显示/隐藏发表评论 
    $('#introduce .comment h6 span').on('click', function() {
        $('.comment .comment-shade').slideDown()
    })

    $('.comment .comment-shade .close').on('click', function() {
        $('.comment .comment-shade').slideUp()
    })

    // 点击跳转选座页面
    $('.main-top .btn .buyticket').on('click', function() {
        if (isLogin()) {
            location.href = "./cinemalists.html?movieid=" + id
        } else {
            if (confirm('您还未登录,是否前往登录?')) {
                $('.loginbtn').click()
            }
        }
    })
    $('.shade .close').on('click', function() {
        location.reload()
    })
    $('#header .exit').on('click', function() {
        location.reload()
    })
})