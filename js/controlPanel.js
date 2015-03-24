/* global window */
(function(angular) {

angular
  .module('controlPanel', ['controlPanel.components'])
  .controller('controlPanel', [controlPanelControlller]);

  ///////////

  function controlPanelControlller(){
    var vm = this;
  }

})(window.angular);
