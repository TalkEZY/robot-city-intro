/* global window */
(function(angular) {

angular
  .module('controlPanelMainFrame', [])
  .directive('mainFrame', ['$timeout', '$interval', mainFrame]);

///////////////

function mainFrame($timeout, $interval) {

  return {
    replace: false,
    restrict: 'A',
    link: link,
    scope: {
      state: '='
    },
    templateUrl: 'control_panel/control_panel.main_frame.partial.html'
  };

  ////////////////

  function link($scope,$el,$attrs) {
    $scope.state = $scope.state || {};
    var state = $scope.state;

    state.time = 0;
    state.sample = 100;
    state.speed = 10;

    state.start = start_countdown;
    state.stop = stop_countdown;

    // rig, to start the timer
    $timeout(function() {
      state.start(1000 * 60 * 3 + 1000*60*60*5);
    },2000);

    ////////////

    function start_countdown(time) {
      if(!isNaN(time)) {
        state.time = time;
      }

      state._timeout = $timeout(function() {
        var reduce = (state.sample/1000) * state.speed * 1000;
        if(state.time > reduce) {
          state.time -= reduce;
          start_countdown();
        }
        else {
          state.time = 0;
        }
      },state.sample)
    }

    function stop_countdown() {
      $timeout.cancel(state._timeout);
    }

  }


}

})(window.angular);
