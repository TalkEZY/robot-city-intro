$('.layer').click(function(e) {
    e.preventDefault();
    var x = e.pageX - $(e.target).offset().left;
    var y = e.pageY - $(e.target).offset().top;
    alert('x,y :' + x + ',' + y);
})
