$(function() {
    let cinemaData = getCinema()
    let movieid = location.search.substring(9, ) || '1292213'
        // console.log(cinemaData)
    let index
        // $('.place-select ul').on('mouseenter', 'li', function() {
        //     index = $(this).siblings('.active').index()
        //     if (index === -1) {
        //         index = $(this).index()
        //     }
        //     $(this).addClass('active').siblings().removeClass('active')
        // })

    // $('.place-select ul').on('mouseleave', 'li', function() {
    //     $(this).parent().children().eq(index).addClass('active').siblings().removeClass('active')
    // })
    let brandStr = '<li class="active">全部</li>'
    cinemaData.forEach(e => {
        brandStr += `<li>${e.name.match(/[\u4e00-\u9fa50-9a-zA-Z]+城/)}</li>`
    })
    $('.brand').html(brandStr)
    let area = ['地铁附近', '武侯区', '双流区', '郫都区', '新都区', '成华区', '金牛区', '龙泉驿区', '青羊区', '温江区', '金堂县', '都江堰市', '崇州市', '新津区', '青白江区', '邛崃市', '大邑县', '蒲江县', '简阳市']
    let areaStr = '<li class="active">全部</li>'
    area.forEach(e => {
        areaStr += `<li>${e}</li>`
    })
    $('.area').html(areaStr)


    let special = ['IMAX厅', 'CGS中国巨幕厅', '杜比全景声厅', 'Dolby Ccinema厅', 'RealD厅', 'RealD6Fl厅', 'LUXE巨幕厅', '4DX厅', 'DTS:X临境音厅', '儿童厅', '4K厅', '4D厅']
    let specialStr = '<li class="active">全部</li>'
    special.forEach(e => {
        specialStr += `<li>${e}</li>`
    })
    $('.special').html(specialStr)






    $('.place-select ul').on('click', 'li', function() {
        $(this).addClass('active').siblings().removeClass('active')

        let brandHtml = $('.brand .active').html()
        let areaHtml = $('.area .active').html()
        brandHtml = brandHtml === '全部' ? '' : brandHtml
        areaHtml = (areaHtml === '全部' || areaHtml === '地铁附近') ? '' : areaHtml
        let brandReg = new RegExp(brandHtml)
        let areaReg = new RegExp(areaHtml)
        let arr = cinemaData.filter(e => {
            return brandReg.test(e.name) && areaReg.test(e.address)
        })
        apply(arr)
        if ($('.serve .active').html() === '可退票') apply([])
    })

    apply(cinemaData)

    function apply(data) {
        if (data.length) {
            let str = ''
            let flag = false
            data.forEach(e => {
                if (e.movies.indexOf(movieid) !== -1) {
                    flag = true
                } else {
                    flag = false
                }
                str += ` <li class="list-item" data-id="${e.id}">
                <div class="item-left">
                    <h6>${e.name}</h6>
                    <p>${e.address}</p><span>改签</span><span>折扣卡</span>
                </div>
                <div class="item-right">
                    <p><em>￥</em><span>23</span> 起<button class="${flag ? 'select' : 'stop'}">选座购票</button></p>
                    <i>24km</i>
                </div>
            </li>`
            })
            $('.movie-list .list-middle').html(str)
        } else {
            $('.movie-list .list-middle').html('')
        }
    }

    $('.movie-list').on('click', '.select', function() {
        location.href = "./cinemadetail.html" + (location.search || '?') + '&cinemaid=' + $(this).parents('.list-item').data('id')
    })
})