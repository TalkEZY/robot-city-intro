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
    scope: {
      d: '=model'
    },
    templateUrl: 'controlPanel/meter_vert.partial.html'
  };

  ////////////////

  function link($scope,$el,$attrs) {
    $scope.d = $scope.d || {};
    var d = $scope.d;
    var bar = $el.find('.bar');

    // Custom color
    $scope.$watch('d.color', function(newVal) {
      bar.css('background-color', newVal)
    })

    // Watch the value
    $scope.$watch('d.value', setHeight)

    ///////////

    function setHeight(height) {
      // Delay for effect
      $timeout(function() {
      // Bound the value
        height = Math.min(Math.max(height, 2),98);
        bar.css('top', (100 - height) + '%');
      }, 400);
    }

  }

}

})(window.angular);
