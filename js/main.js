(function($, skrollr){
    'use strict';

    window.choke_timeout;
    window.choke_time = 400;
    window.skrollr_inst;

    var images_loaded = 0;
    var images_to_load = $('.layer').length;
    var done_loading_images = false;

    var target_w = 2048;
    var scale = 1;


    // imperative code...
    resize()


    // --------------- Events

    $(document).ready(function(){ });

    $(window).resize(function(){
        // Throttle, so that we only call 'resize' sparingly
        if (window.choke_timeout) { clearTimeout(window.choke_timeout); }
        window.choke_timeout = setTimeout(function(){
            resize();
        },window.choke_time);

    });


    // --------------- Functions

    function image_loaded() {
        if (images_loaded >= (images_to_load -1) && !done_loading_images) {
            done_loading_images = true;
            images_done_loading();
            return
        }
        images_loaded++;
    }

    function images_done_loading() {
        init_skrollr();
    }

    function show() {
        alert('done loading images');
    }

    function create_transform_origin(el){
        var $el = $(el);

        var origin = $el.attr('data-_base');
        if (!origin) { return }

        origin = origin.split(',');
        origin[0] *= scale;
        origin[1] *= scale;
        $el.css('transform-origin',
                origin[0] +'px ' + origin[1]+'px' );
    }

    function resize() {

        var win_w = $(window).width();
        scale = win_w / target_w;
        $('.layers').width(win_w);
        $('.layer').each(function(){
            var $el = $(this);
            draw_image($el);
            create_transform_origin($el);
        });
    }

    function init_skrollr() {
        if (!window.skrollr_inst) {
            window.skrollr_inst = skrollr.init();
        }
    }

    function draw_image(el){

        var img = new Image();
        var $el = $(el);
        var $canvas = $("<canvas/>");
        var context = $canvas.get(0).getContext('2d');

        img.src = $el.data("src");

        $el.find("canvas").remove();

        img.onload = function(event){
            $el.find("canvas").remove();
            var dpi = window.devicePixelRatio || 1;

            var w = Math.floor(img.width * scale * dpi);
            var h = Math.floor(img.height * scale * dpi);

            $canvas
                .attr("width",w)
                .attr("height",h)
                .css({
                    position:"absolute",
                    top:0,
                    left:0,
                    transform:"translate3d(0,0,0)",
                    width:Math.round(w/dpi),
                    height:Math.round(h/dpi)
                })
                .appendTo($el);

            context.drawImage(img,0,0,w,h);
            image_loaded();
        }
    }

}).call(window, jQuery, skrollr);
