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

      tool.panel.opacity = 0.8;
      tool.panel.show = true;
    }

  }

})(window.angular);
