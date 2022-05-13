$(function() {
    let cinemaData = getCinema()
    let str = ''
    cinemaData.forEach(e => {
        str += `
        <li data-id="${e.id}">
        <img src="${e.img_src}">
            <div>
                <h6>${e.name}</h6>
                <p><span></span>1.0km</p>
            </div>
        </li>
    `
    })
    $('#main .cinema').html(str)
    $('#main .cinema').on('click', 'li', function() {
        location.href = "./cinemadetail.html?id=" + $(this).data('id')
    })
})