/* global window */
(function(angular) {

angular
  .module('controlPanel', ['controlPanel.components'])
  .controller('controlPanel', [controlPanelControlller]);

  ///////////

  function controlPanelControlller(){
    var vm = this;

    vm.colors = [
      {label: 'red', value: '#AB4642'},
      {label: 'blue', value: '#7CAFC2'},
      {label: 'green', value: '#A1B56C'},
      {label: 'yellow', value: '#F7CA88'},
      {label: 'grey', value: '#585858'}
    ];

    vm.ducks = {
      label: 'Ducks',
      value: 12,
      color: vm.colors[0].value
    };
    vm.geese = {
      label: 'A largish title',
      value: 60,
      color: vm.colors[1].value
    }

  }

})(window.angular);
