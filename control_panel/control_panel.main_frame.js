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
    var state = $scope.state;

    state.time = 0;
    state.time_sample = 100;
    state.speed = 10;
    state.start_timer = start_countdown;
    state.stop_timer = stop_countdown;

    state.decibels = 56;
    state.decibel_range = 2;
    state.decibel_sample = 80;
    state.start_decibel_jiggle = start_decibel_jiggle;
    state.stop_decibel_jiggle = stop_decibel_jiggle;

    ////////////

    function start_countdown(time) {
      if(!isNaN(time)) {
        state.time = time;
      }

      // We have no running timer?
      if(state._timeout) {
        $timeout.cancel(state._timeout);
      }
      state._timeout = $timeout(function() {
        var reduce = (state.time_sample/1000) * state.speed * 1000;
        if(state.time > reduce) {
          state.time -= reduce;
          start_countdown();
        }
        else {
          state.time = 0;
        }
      },state.time_sample)

    }

    function stop_countdown() {
      $timeout.cancel(state._timeout);
      state._timeout = void 0;
    }

    function start_decibel_jiggle() {

      // Already jiggling
      if(!state._decibel_jiggle_timeout) {
        state._decibel_jiggle_timeout = $interval(function() {
          var new_delta = (Math.random() * state.decibel_range * 2) - state.decibel_range;
          state.decibels = Math.round((state.decibels + new_delta))
        }, state.decibel_sample)
      }
    }

    function stop_decibel_jiggle() {
      $interval.cancel(state._decibel_jiggle_timeout);
      state._decibel_jiggle_timeout = void 0;
    }

  }


}

})(window.angular);
