$('.smoothScroll').click(function(event) {
    return eventClick = event
});

var eventClick;

function smoothscroll(eve) {
    eve.preventDefault();
    switch (toogle) {
        case 0:
            var href = "#mobileOperatingSystem";
            var target = $(href);
            var top = target.offset().top;
            $('html,body').animate({
                scrollTop: top
            }, 1000);
            break;
        case 2:
            var href = "#screens";
            var target = $(href);
            var top = target.offset().top;
            $('html,body').animate({
                scrollTop: top
            }, 1000);
            break;
        default:
            var href = $(eve.currentTarget).attr('href');
            var target = $(href);
            var top = target.offset().top;
            $('html,body').animate({
                scrollTop: top
            }, 1000);
    }
};

function notScrolling(eve) {
    eve.preventDefault();
};