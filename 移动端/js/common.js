$(function() {
    $(window).on('resize', adjust)

    function adjust() {
        let rem = 0
        innerWidth < 375 && (rem = 50)
        innerWidth >= 375 && (rem = 100 / 750 * innerWidth)
        $('html').css('font-size', rem + 'px')
    }
    adjust()
    showPass()
})