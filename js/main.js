(function($){
    'use strict';

    window.choke_timeout;
    window.choke_time = 400;

    var images_loaded = 0;
    var images_to_load = $('.layer').length;
    var done_loading_images = false;

    var target_w = 2048;
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


    // --------------- Functions

    function image_loaded() {
        if (images_loaded >= (images_to_load -1) && !done_loading_images) {
            done_loading_images = true;
            show();
            return
        }
        images_loaded++;
    }

    function show() {
        alert('done loading images');
    }

    function resize() {

        scale = $(window).width() / target_w;
        console.log('scale',scale);
        $('.layer').each(function(){
            draw_image($(this));
        });
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

}).call(window, jQuery);
