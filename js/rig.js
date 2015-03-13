// // Click and get an alert box with he relative point withn that element
// $('.layer').click(function(e) {
//     e.preventDefault();
//     var x = e.pageX - $(e.target).offset().left;
//     var y = e.pageY - $(e.target).offset().top;
//     alert('x,y :' + x + ',' + y);
// })

// Put the version in the top-right
$.getJSON('package.json', function(pkg) {
    $('#version').html('v' + pkg.version);
});
