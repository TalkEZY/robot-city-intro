(function($){
    'use strict';

    var images_loaded = 0;
    var images_to_load = $('.layer').length;

    $('.layer').each(function(){
        draw_image($(this));
    });

    $(document).ready(function(){

    });

    function image_loaded() {
        images_loaded++;
        if (images_loaded >= images_loaded) {
            console.log('Images loaded');
        }
        console.log('images_loaded',images_loaded);
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

            var w = Math.round(img.width * dpi);
            var h = Math.round(img.height * dpi);

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
            imageLoaded();
        }
    }

}).call(window, jQuery);
