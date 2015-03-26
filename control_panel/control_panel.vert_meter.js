/* global window */
(function(angular) {

angular
  .module('controlPanelVertMeter', [])
  .directive('vertMeter', ['$interval', '$timeout', vertMeter]);

///////////////

function vertMeter($interval, $timeout) {

  return {
    replace: false,
    restrict: 'A',
    link: link,
    scope: {
      state: '='
    },
    templateUrl: 'control_panel/control_panel.vert_meter.partial.html'
  };

  ////////////////

  function link($scope,$el,$attrs) {
    $scope.state = $scope.state || {};
    var state = $scope.state;
    var bar = $el.find('.bar'); // This is proper jQuery not jqlite... be warned!
    var min = 2, max = 100;

    // Custom color
    $scope.$watch('state.color', function(newVal) {
      bar.css('background-color', newVal)
    })

    // Watch the value
    $scope.$watch('state.value', setHeight)

    ///////////

    function setHeight(height) {
      // Delay for effect
      // Bound the value
      height = Math.min(Math.max(height, min),max);
      bar.css('top', (100 - height) + '%');
    }

  }

}

})(window.angular);
