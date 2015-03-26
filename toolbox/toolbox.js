/* global window */
(function(angular) {

angular
  .module('toolbox', [])
  .directive('toolbox', toolboxDirective)

  ///////////

  function toolboxDirective(){
    return {
      link: toolboxDirectiveLink,
      restrict: 'EA',
      replace: false,
      templateUrl: 'toolbox/toolbox.partial.html'
    }

    /////////
    function toolboxDirectiveLink($scope, $el, $attrs) {
      // var vm = $scope;
      // vm.mockup = vm.mockup || {};
      // vm.mockup.show = true;
      var tool = $scope.tool = $scope.tool || {};
      tool.mockup = tool.mockup || {};
      tool.panel = tool.panel || {};

      tool.mockup.opacity = 0.8;
      tool.mockup.show = true;

      tool.panel.opacity = 1;
      tool.panel.show = true;

      tool.click_for_xy_enable = true;
      tool.click_for_xy = click_for_xy;

      /////////////

      function click_for_xy(e) {
        if(tool.click_for_xy_enable) {
          window.rig.alert_xy_scaled_percent(e);
        }
      }
    }

  }

})(window.angular);
