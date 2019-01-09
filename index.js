const $ = require('jquery');

const cols = {
    bgcol: '#ffffff',
    fontcol: '#0d0d0d',
    orange: '#d0693a',
};

const fs = parseFloat($('body').css('font-size'));

$('#cities nav > button svg')
    .attr('width', fs*2);

$('nav #city-buttons button').click(function () {
    window.scrollTo({
        top: document.getElementById('cities').offsetTop,
        behavior: "smooth"
    });

    const $t = $(this);
    $('nav button').removeClass('active');
    $t.addClass('active');
    $('#viewer').attr('src', `webplayer/webplayer.html?load=${$t.data('city')}.json`);

});

$('#up').click(function () {
    window.scrollTo({
        top: document.getElementById('cities').offsetTop - window.innerHeight / 3,
        behavior: "smooth"
    });
});

$('#down').click(function () {
    window.scrollTo({
        top: document.getElementById('cities').offsetTop + window.innerHeight * 1,
        behavior: "smooth"
    });
});