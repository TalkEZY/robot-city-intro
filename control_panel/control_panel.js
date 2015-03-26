/* global window */
(function(angular) {

angular
  .module('controlPanel', ['controlPanelVertMeter', 'controlPanelMainFrame','controlPanelSelectionBoxes', 'toolbox'])
  .controller('controlPanel', ['$timeout',controlPanelControlller]);

  ///////////

  function controlPanelControlller($timeout){
    var vm = this;

    vm.colors = [
      {label: 'red', value: '#AB4642'},
      {label: 'blue', value: '#7CAFC2'},
      {label: 'green', value: '#A1B56C'},
      {label: 'yellow', value: '#F7CA88'},
      {label: 'grey', value: '#585858'}
    ];

    vm.points = {
      label: 'Points',
      value: 12,
      color: vm.colors[0].value,
      show: true,
    };
    vm.explored = {
      label: 'Explored',
      value: 100,
      color: vm.colors[1].value,
      show: true
    }

    vm.main_frame = {
      time: 100,
      show: true
    }

    vm.boxes = [];

    for(var i=0; i< 6; i++) {
      vm.boxes[i] = {
        // img_url: 'http://placekitten.com/g/300/300',
        // disabled: false,
        // click: 'state.box_clicked()'
      };
    }

    // Rig, start things going to see some action...
    $timeout(function() {
      vm.points.value = 45;
      vm.main_frame.time = 1000 * 60 * 7;
      // vm.main_frame.start_timer();
      // vm.main_frame.start_decibel_jiggle();
    },1000)

  }

})(window.angular);
