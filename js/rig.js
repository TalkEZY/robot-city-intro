// // Click and get an alert box with he relative point withn that element
$('.layer').click(alert_xy_scaled);
// $('.scaled').click(alert_xy_scaled);
$('.scaled').click(alert_xy_scaled_percent);

var target_w = 2048;
var target_h = 1536;

function alert_xy_scaled(e) {
  var xy = get_xy_scaled(e);
  alert_xy(xy);
}

function get_xy_scaled(e) {
  e.preventDefault();
  el = $(e.target);
  var scale = calc_scale(el);
  var x = e.pageX - el.offset().left;
  var y = e.pageY - el.offset().top;
  x /= scale;
  y /= scale;
  return [x,y];
}

function alert_xy_scaled_percent(e) {
  var xy = get_xy_scaled(e);
  xy[0] = (xy[0] / target_w) * 100;
  xy[1] = (xy[1] / target_h) * 100;
  alert_xy(xy,'%');
}

function alert_xy(xy,suffix) {
  alert('x,y: ' + xy[0].toFixed(2) + suffix + ',' + xy[1].toFixed(2) + suffix);
}

function calc_scale(el) {
  el = $(el);
  return el.width()/target_w;
}

// Put the version in the top-right
$.getJSON('package.json', function(pkg) {
    $('#version').html('v' + pkg.version);
});
