const $ = require('jquery');
const tippy = require('tippy.js');

const cols = {
    bgcol: '#ffffff',
    fontcol: '#0d0d0d',
    orange: '#d0693a',
};

$(document).ready(function () {    
    
    $('nav button').click(function () {
        const $t = $(this);
        const $sect = $t.closest('section');
        if ($t.hasClass('active')) { 
            if (window.innerWidth < 750) {
                $t.siblings('button')
                    .fadeToggle({
                        duration: 500,
                        easing: 'linear',
                        queue: false,
                    })
                    .toggleClass('mob-vis');
            } else {
                return;
            }
        } else {
            $sect.find('nav button').removeClass('active');
            $t.addClass('active');
            if ($sect.attr('id') === 'cities-photo') {
                $('#cities-photo img')
                    .css('opacity', 0)
                    .attr('src', `img/${$t.data('city')}.jpg`)
                    .on('load', function () {
                        $(this).css('opacity', 1)
                    });
            } else {
                $('#viewer')
                    .attr(
                        'src',
                        `webplayer/webplayer.html?load=http://texty.org.ua/maps/blender/${$t.data('city')}.json`
                    );
            }

            if (window.innerWidth < 750) {
                $t.parent().prepend($t);
                $t.siblings('button')
                    .hide()
                    .removeClass('mob-vis');
            }
        }
    });

    const tip = tippy('a#help', {
        content: `
<div>
<h5>Довідка</h5>
<p>3D-макет міста можна <strong>збільшувати</strong> за допомогою коліщатка миші або тачпаду.</p>
<p>Клікніть й тягніть, щоб <strong>обертати</strong> макет.</p>
<p class="caption">Дані висотності: OpenStreetMap</p>
</div>`,
        performance: true,
        placement: 'bottom',
        animation: 'perspective',
    });

    window.addEventListener('scroll', function () {
        tippy.hideAllPoppers();
    });
    
});

(function () {
    if (window.__textySocialButtonsHandler) return;
    var windowOptions = 'scrollbars=yes,resizable=yes,toolbar=no,location=yes',
        width = 550,
        height = 420,
        winHeight = screen.height,
        winWidth = screen.width;

    function handleIntent(e) {
        e = e || window.event;
        var target = e.target || e.srcElement,
            left, top;

        while (target && target.nodeName.toLowerCase() !== 'a') {
            target = target.parentNode;
        }

        if (target && target.nodeName.toLowerCase() === 'a' && target.href) {
            if (hasClass(target, 'share-btn')) {
                left = Math.round((winWidth / 2) - (width / 2));
                top = 0;

                if (winHeight > height) {
                    top = Math.round((winHeight / 2) - (height / 2));
                }

                window.open(target.href, 'intent', windowOptions + ',width=' + width +
                    ',height=' + height + ',left=' + left + ',top=' + top);
                e.returnValue = false;
                e.preventDefault && e.preventDefault();
            }
        }
    }

    function hasClass(element, cls) {
        return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }

    if (document.addEventListener) {
        document.addEventListener('click', handleIntent, false);
    } else if (document.attachEvent) {
        document.attachEvent('onclick', handleIntent);
    }
    window.__textySocialButtonsHandler = true;
}());