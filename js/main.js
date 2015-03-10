(function($, skrollr){
    'use strict';

    var SCROLL_DOWN_DURATION = 2000;
    window.choke_timeout;
    window.choke_time = 400;
    window.skrollr_inst;

    var layers_container = '#layers';
    var layers = '.layer';
    var loading_mask = "#loading-mask";
    var loading_mask_height;

    var images_loaded = 0;
    var images_to_load = $(layers).length;
    var done_loading_images = false;

    var target_w = 2048;
    var target_h = 1536;
    var target_ratio = target_w / target_h;;

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
        console.log($(document).height());
        scrollToBottom();
    })


    // --------------- Functions - Higher level

    function images_done_loading() {
        init_skrollr().then(show);
    }

    function show() {
        $('#loading-screen').hide();
    }

    function resize() {
        // Calculate the scale / ratio
        var $win = $(window);
        var win_w = $win.width();
        var win_h = $win.height();

        calc_scale(win_w, win_h);

        $(layers_container).width(scale * target_w);
        $(layers_container).height(scale * target_h);

        resize_layers();
        resize_intro_section();
    }

    function calc_scale(win_w, win_h) {

        var win_ratio = win_w / win_h;

        if (win_ratio > target_ratio) {
            // Use height
            scale = win_h / target_h;
        } else {
            // Use width
            scale = win_w / target_w;
        }

    }

    // --------------- Functions - Utillity

    function scrollToBottom() {
        // The position top should be, at the bottom of the page
        var topBot = $(document).height() - $(window).height();
        window.skrollr_inst.animateTo(topBot, {duration: SCROLL_DOWN_DURATION});
    }

    function resize_layers() {
        $(layers).each(function(){
            var $el = $(this);
            draw_image($el);
            custom_scaled_attrs($el);
        });
    }

    function resize_intro_section() {
        custom_scaled_attrs($('#intro-section'));
    }

    function image_loaded() {
        if (done_loading_images) { return; }
        images_loaded++;
        update_loading(images_loaded/images_to_load);
        if (images_loaded >= images_to_load  && !done_loading_images) {
            images_loaded = 0;
            done_loading_images = true;
            images_done_loading();
            return
        }
    }

    function update_loading(percent) {
        var $mask = $(loading_mask);

        if (!loading_mask_height) {
            loading_mask_height = $mask.attr('height');
        }

        $mask.attr('height', loading_mask_height * (1 - percent));
    }

    function custom_scaled_attrs (el) {
        var $el = $(el);

        $.each($el.data(), function(k,v) {
            // scale each value that is wrapped with curly braces .... {number}
            var new_value = ('' + v).replace(/\{(-?[0-9.]+)\}/g, function(match, num) {
                return parseFloat(num) * scale;
            })
            $el.attr('data-'+k, new_value);
        });

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
            height = parseFloat(height);
            if (0 < height <= 1) {
                // We are using a percentage then...
                height *= target_h;
            }
            height *= scale;
            $el.css('height', height);
        }
    }

    function refresh_skrollr() {
        if (!window.skrollr_inst) {
            init_skrollr();
        } else {
            window.skrollr_inst.refresh();
        }
    }

    function init_skrollr() {
        var promise = $.Deferred();

        window.skrollr_inst = skrollr.init({forceHeight: false });

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
