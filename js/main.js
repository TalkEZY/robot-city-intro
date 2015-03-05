(function($, skrollr){
    'use strict';

    window.choke_timeout;
    window.choke_time = 400;
    window.skrollr_inst;

    var images_loaded = 0;
    var images_to_load = $('.layer').length;
    var done_loading_images = false;

    var target_w = 2048;
    var target_h = 1536;
    var scale = 1;


    // imperative code...
    resize();


    // --------------- Events

    $(document).ready(function(){ });

    $(window).resize(function(){
        // Throttle, so that we only call 'resize' sparingly
        if (window.choke_timeout) { clearTimeout(window.choke_timeout); }
        window.choke_timeout = setTimeout(function(){
            resize();
        },window.choke_time);

    });

    $('.scroll-down').click(function(e) {
        e.preventDefault();
        window.skrollr_inst.animateTo($(document).height(), 2400);

    })


    // --------------- Functions - Higher level

    function images_done_loading() {
        init_skrollr().then(show);
    }

    function show() {
        $('#loading-screen').hide();
    }

    function resize() {
        scale = $(window).width() / target_w;
        resize_layers();
        resize_intro_section();
        skrollr.init().refresh();
    }

    // --------------- Functions - Utillity

    function resize_layers() {
        var layer_order = 0;

        $('.layers').width($(window).width());
        $('.layers').height(scale * target_h);
        $('.layer').each(function(){
            var $el = $(this);
            $el.css('z-index', layer_order++);
            draw_image($el);
            custom_scaled_attrs($el);
        });
    }

    function resize_intro_section() {
        custom_scaled_attrs($('#intro-section'));
    }

    function image_loaded() {
        images_loaded++;
        update_loading(images_loaded/images_to_load);
        if (images_loaded >= images_to_load  && !done_loading_images) {
            images_loaded = 0;
            done_loading_images = true;
            images_done_loading();
            return
        }
    }

    var loading_mask = '#loading-city-mask';
    var loading_mask_height = null;
    function update_loading(percent) {
        if (!loading_mask_height) {
            loading_mask_height = $(loading_mask).attr('height');
        }
        $(loading_mask).attr('height', loading_mask_height * (1 - percent));
    }

    function custom_scaled_attrs (el) {
        var $el = $(el);

        var origin = $el.attr('data-_origin');
        if (origin) {
            origin = origin.split(',');
            origin[0] *= scale;
            origin[1] *= scale;
            $el.css('transform-origin',
                    origin[0] +'px ' + origin[1]+'px' );
        }

        var top = $el.attr('data-_top');
        if (top) {
            top = parseInt(top, 10) * scale;
            $el.css('top', top);
        }

        var height = $el.attr('data-_height');
        if (height) {
            if (0 < height <= 1) {
                // We are using a percentage then...
                height *= target_h;
            }
            height *= scale;
            $el.css('height', height);
        }
    }

    function init_skrollr() {
        var promise = $.Deferred();

        window.skrollr_inst = skrollr.init({ });

        // animate/scroll 1px down, so that everything is in place, then allow the promise to resolve.
        window.skrollr_inst.animateTo(1, {done: function() {promise.resolve() }});

        return promise;
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
