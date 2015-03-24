angular.module('controlPanel.components', [])
    .directive('robotGreeting', function robotGreetingDirective() {
        function setup($scope,$el,$attrs) {
            var vm = $scope.vm;
            vm.greetee = 'robots';
            vm.greeting = $attrs.greeting;
        }

        return {
            replace: false,
            restrict: 'A',
            scopt: {},
            link: setup,
            template: '<h3> {{vm.greeting}} {{vm.greetee}}</h3>'
        };
    });
