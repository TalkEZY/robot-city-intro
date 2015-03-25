/* global window */
(function(angular) {

angular
  .module('controlPanel', ['controlPanelVertMeter', 'controlPanelMainFrame'])
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

    $timeout(function() {
      vm.points.value = 45;
    },2000)

  }

})(window.angular);
