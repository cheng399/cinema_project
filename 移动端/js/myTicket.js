$(function() {
    $('#main .tobeused').html('')
    let data = getCurrentAccount()
    let movies = getMovies()
    let cinemas = getCinema()
    let ticket1 = ''
    let ticket2 = ''
    let account = getMovieAccount()
    let newArr = []
    account.some(e => {
        if (e.uname === data[0]) {
            newArr = [...e.ticket]
            return true
        }
    })
    if (newArr.length) {
        newArr.forEach(e => {
            ticket1 += loadOrder(e)[0]
            ticket2 += loadOrder(e)[1]
        })
        $('#main .tobeused').html(ticket1)
        $('#main .allorder').html(ticket2)
    } else {

    }

    function loadOrder(arr) {
        let str1 = ''
        let str2 = ''
        let orderid = arr.orderid
        let movie = movies.filter(e => e.id === arr.movieid)[0]
        let cinema = cinemas.filter(e => e.id == arr.cinemaid)[0]
        str1 += `
            <li data-id="${movie.id}&${cinema.id}">
                <div>
                    <h6>${movie.title.split(' ')[0]}</h6>
                    <img src="../images/ewm.png" alt="">
                    <p class="address"><span>${cinema.name}</span> • <span>2022-05-19 19:00</span></p>
                    <p class="code">
                        <span>${orderid}</span>
                        <a href="#/">查看详情 &gt;</a>
                    </p>
                </div>
            </li>
            `
        str2 += `
            <li>
                <img src="${movie.imgSrc}" alt="">
                <div>
                    <h5 class="title">${movie.title.split(' ')[0]}</h5>
                    <p>${cinema.name}</p>
                    <p>2022-05-19</p>
                    <span>交易成功</span>
                </div>
            </li>
            `
        return [str1, str2]
    }
    if (!isLogin()) {
        if (confirm('未登录，是否前往登录？')) {
            location.href = './login.html'
        } else {
            location.href = '../index.html'
        }
    }
    $('#main .tobeused').on('click', 'li a', function() {
        location.href = `./ticketdetail.html?id=${$(this).parents('li').data('id')}`
    })


    $('#main .item h5 a').on('click', function() {
        location.href = "./html/featureMovies.html?" + $(this).data('name')
    })

    $('#header .tab').on('click', 'li', function() {
        $(this).addClass('active').siblings().removeClass('active')
            // $('#main ul').eq($(this).index()).stop().slideDown().siblings().stop().slideUp()
        $('#main ul').eq($(this).index()).stop().show().siblings().stop().hide()
    })
})