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
        if ($t.hasClass('active')) { 
            if (window.innerWidth < 750) {
                $t.siblings('button')
                    .fadeToggle({
                        duration: 750,
                        easing: 'linear',
                        queue: false,
                    })
                    .toggleClass('mob-vis');
            } else {
                return;
            }
        } else {
            $('nav button').removeClass('active');
            $t.addClass('active');
            $('#viewer').attr('src', `webplayer/webplayer.html?load=${$t.data('city')}.json`);

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