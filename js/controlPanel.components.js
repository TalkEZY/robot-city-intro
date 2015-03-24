/* global window */
(function(angular) {

angular
  .module('controlPanel.components', [])
  .directive('meterVert', ['$interval', '$timeout', meterVert]);

///////////////

function meterVert($interval, $timeout) {

  return {
    replace: false,
    restrict: 'A',
    link: link,
    scope: {},
    templateUrl: 'controlPanel/meter_vert.partial.html'
  };

  ///////

  function link($scope,$el,$attrs) {
    $scope.d = $scope.d || {};
    var d = $scope.d;
    var bar = $el.find('.bar');

    d.value = Math.ceil(Math.random() * 100);
    d.label = 'Ducks';

    // Custom color
    var color = $attrs.color;
    if(color) {
      bar.css('background-color', color)
    }

    // Random oscillating
    // var update_int = $interval(function() {
    //   bar.css('top', (100 - (Math.ceil(Math.random() * 95) + 5)) + '%');
    // },1000);

    // $el.on('destroy', function() {
    //   $interval.clear(update_int);
    // })

  }

}

})(window.angular);
