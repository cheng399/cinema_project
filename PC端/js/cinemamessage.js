$(function() {
    // 获取电影列表
    let movie = getMovies()

    // 最新资讯渲染
    let random1 = getRandom(0, movie.length - 7)
    let str1 = ''
    movie.forEach((e, i) => {
        if (i > random1 && i <= random1 + 6) {
            str1 += `
            <li><img src="${e.posterSrc}">
                <p>电影《${e.title.split(' ')[0]}》演员选角流程规范化试行版方案一键公司焕发团队</p>
                <div><span>蜗牛电影</span><i>${getRandom(10, 999)}</i></div>
            </li>
                `
        }
    })
    $('#message .newmes ul').html(str1)


    // 预告片速递渲染
    let random2 = getRandom(0, movie.length - 7)
    let str2 = ''
    movie.forEach((e, i) => {
        if (i > random2 && i <= random2 + 6) {
            str2 += `
            <li>
                <img src="${e.posterSrc}" alt="">
                <div>
                    <p class="title">《${e.title.split(' ')[0]}》虐恋爱情电影《${e.title.split(' ')[0]}》定档8月20日，柯佳嬿“想...</p>
                    <span>${getRandom(100, 999)}</span>
                    <i></i>
                </div>
            </li>
            `
        }
    })
    $('#message .foreshow ul').html(str2)

    // 预告片速递渲染
    let random3 = getRandom(0, movie.length - 1)
    let str3 = ''
    let e = movie[random3]

    str3 = `
            <i>1</i>
                <div class="pic"><img src="${e.posterSrc}" alt=""></div>
                <div class="txt">
                    <p><a href="#/">《${e.title.split(' ')[0]}》发布“青春兔子帮”版 海报 万茜李庚希放飞心愿</a></p>
                </div>
            `
    $('#message .hotsmessage .first').html(str3)

    // 娱乐热点渲染
    let random4 = getRandom(0, movie.length - 6)
    let str4 = ''
    let num = 1
    movie.forEach((e, i) => {
        if (i > random4 && i <= random4 + 5) {
            str4 += `
            <li>
                <i>${num++}</i>
                <div class="pic"><img src="${e.posterSrc}" alt=""></div>
                <div class="txt">
                    <p><a href="#/">《${e.title.split(' ')[0]}》发布“青春兔子帮”版 海报 万茜李庚希放飞心愿</a></p>
                </div>
            </li>
        `
        }
    })
    $('#message .recreationhot ul').html(str4)


    $('#main .main_head').on('click', 'li', function() {
        $(this).addClass('active').siblings().removeClass('active')
    })
})