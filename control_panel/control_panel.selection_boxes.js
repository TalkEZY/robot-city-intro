/* global window */
(function(angular) {

angular
  .module('controlPanelSelectionBoxes', [])
  .directive('selectionBoxes', [selectionBoxes]);

///////////////

function selectionBoxes() {

  return {
    replace: false,
    restrict: 'A',
    link: link,
    scope: {
      state: '='
    },
    templateUrl: 'control_panel/control_panel.selection_boxes.partial.html'
  };

  ////////////////

  function link($scope,$el,$attrs) {
    var state = $scope.state;

    ////////////

  }


}

})(window.angular);
