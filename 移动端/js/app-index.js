// !isMobile() && (location.href = '../PC端/index.html')
// $(function() {
//     let i = 0
//     let timer
//     var point = {};
//     let box = $('#main .item >div')
//     box.on('touchstart', function(e) {
//         var p = e.changedTouches[0];
//         point.startX = p.clientX;
//         point.startY = p.clientY;
//     })
//     box.on('touchmove', function(e) {
//         var p = e.changedTouches[0];
//         point.changeX = p.clientX - point.startX;
//         point.changeY = p.clientY - point.startY;
//     })
//     box.on("touchend", function(e) {
//         let list = $(this).children('ul')
//         console.log(point.changeX)
//         console.log(point.changeY)
//         if (Math.abs(point.changeY) < Math.abs(point.changeX)) {
//             if (point.changeX > 0) {
//                 if (parseInt(list.css('marginLeft')) < 0) {
//                     list.css('marginLeft', '+=150px')
//                 } else {
//                     list.css('marginLeft', '0px')
//                 }
//             } else if (point.changeX < 0) {
//                 if (-parseInt(list.css('marginLeft')) < (list.children().length - 1) * parseInt(list.children().css('width'))) {
//                     list.css('marginLeft', '-=150px')
//                 } else {
//                     list.css('marginLeft', -(list.children().length - 1) * parseInt(list.children().css('width')) + 'px')
//                 }
//             }
//         }
//         timer = setTimeout(function() {
//             if (parseInt(list.css('marginLeft')) > 0) {
//                 list.css('marginLeft', '0px')
//             } else if (-parseInt(list.css('marginLeft')) > (list.children().length - 1) * parseInt(list.children().css('width'))) {
//                 list.css('marginLeft', -(list.children().length - 1) * parseInt(list.children().css('width')) + 'px')
//             }
//         }, 500)
//         point = {}
//     });
// })
!isMobile() && (location.href = '../PC端/index.html')
$(function() {
    let list
    var point = {};
    let data = getCurrentAccount()
    if (data[3]) {
        $('#header .user').html(data[0])
        let movies = getMovies()
        let cinemas = getCinema()
        let ticket = ''
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
                ticket += loadOrder(e)
            })
            $('#main .ticket .box').html(ticket)
        } else {
            $('#main .item.ticket').hide()
        }

        function loadOrder(arr) {
            let str = ''
            let orderid = arr.orderid
            let movie = movies.filter(e => e.id === arr.movieid)[0]
            let cinema = cinemas.filter(e => e.id == arr.cinemaid)[0]
            str += `
        <li data-id="${movie.id}&${cinema.id}">
            <div>
                <h6>${movie.title.split(' ')[0]}</h6>
                <p class="address"><span>${cinema.name}</span> • <span>2022-05-20 19:00</span></p>
                <p class="code">
                    <span>${orderid}</span>
                    <a href="#/">查看详情 &gt;</a>
                </p>
            </div>
        </li>
            `
            return str
        }
    } else {
        $('#header .user').html('请登录')
        $('#main .item.ticket').hide()
    }
    $('#main .item h5 a').on('click', function() {
        location.href = "./html/featureMovies.html?" + $(this).data('name')
    })

    $('.ticket li').on('click', 'a', function() {
        location.href = `./html/ticketdetail.html?id=${$(this).parents('li').data('id')}`
    })


    let box = $('#main .item >div')
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
    });
})