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
    var state = $scope;

    state.boxes = [];


    for(var i=0; i< 6; i++) {
      state.boxes[i] = {
        img_url: 'http://placekitten.com/g/300/300/',
        id: i,
        disabled: true,
      };
    }

    state.box_clicked = box_clicked;

    ////////////

    function box_clicked(box) {
      console.log(box);
      window.alert('hello box#' + box.id);
    }

  }


}

})(window.angular);
