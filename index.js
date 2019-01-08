var cols = {
    bgcol: '#ffffff',
    fontcol: '#0d0d0d',
    orange: '#d0693a',
};

$('#canvas-cont')
    .css('height', $(window).height())
    .css('width', $(window).width())
    .css('position', 'relative');

$('nav').css('height', $(window).height())
    .css('width', $(window).width());

var fs = parseFloat($('body').css('font-size'));

$('#cities nav > button svg')
    .attr('width', fs*2);


b4w.register('cities_app', function(exports, require) {
// import modules used by the app

    var m_app = b4w.require('app');
    var m_data = b4w.require('data');
    var m_preloader = b4w.require('preloader');
    var m_ver = b4w.require('version');

// detect application mode
    var DEBUG = (m_ver.type() == 'DEBUG');

    /**
     * export the method to initialize the app (called at the bottom of this file)
     */
    exports.init = init;
    function init() {
        m_app.init({
            canvas_container_id: 'canvas-cont',
            callback: init_cb,
            show_fps: DEBUG,
            console_verbose: DEBUG,
            autoresize: true,
            alpha: true,
        });
    }

    /**
     * callback executed when the app is initialized
     */
    function init_cb(canvas_elem, success) {

        if (!success) {
            console.log('b4w init failure');
            return;
        }

        canvas_elem.oncontextmenu = function (e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        };

        m_preloader.create_preloader({
            container_color: cols.bgcol, // background color of the container
            bar_color: cols.fontcol, // background color of the bar
            frame_color: cols.fontcol, // color of the frame border
            font_color: cols.orange // color of the font
        });

        m_data.load(
            'cities/' + $('nav button.active').data('city') + '.json',
            load_cb,
            preloader_cb
        );
    }

    /**
     * update the app's preloader
     */
    function preloader_cb(percentage) {
        m_preloader.update_preloader(percentage);
    }

    /**
     * callback executed when the scene data is loaded
     */
    function load_cb(data_id, success) {

        if (!success) {
            console.log('b4w load failure');
            return;
        }

        m_app.enable_camera_controls();
    }
});

b4w.require('cities_app').init();

$('nav #city-buttons button').click(function () {
    window.scrollTo({
        top: document.getElementById('cities').offsetTop,
        behavior: "smooth"
    });
    b4w.require("main").reset();
    $('#canvas-cont canvas').remove();

    var $t = $(this);
    $('nav button').removeClass('active');
    $t.addClass('active');
    b4w.require('cities_app').init();

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