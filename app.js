angular.module('cityRoads', [
        'cityRoads.controllers.MainController'
    ])
    .run(function(){});


angular.module('cityRoads.services.StopLightService', [])
    .service('StopLightService', function(){
        this.dir = {
            NS: 'green',
            EW: 'red'
        };
        var main = this;
       this.toggle = function () {
           if(main.dir.NS=='green'){
               main.dir.NS = 'red';
               main.dir.EW = 'green';
           }else{
               main.dir.NS = 'green';
               main.dir.EW = 'red';
           }

        }
    });

angular.module('cityRoads.controllers.MainController', ['cityRoads.services.StopLightService','cityRoads.directives.StopLightDirective','cityRoads.directives.StopLightSwitchDirective'])
    .controller('MainController', function($scope,$interval,StopLightService){
        $scope.direction = 'North-South';
        $scope.NS = StopLightService.dir.NS;
        $scope.EW = StopLightService.dir.EW;
        $scope.button = StopLightService.toggle;
        $scope.$watch(function () {
            return StopLightService.dir;
        },
            function () {
                $scope.NS = StopLightService.dir.NS;
                $scope.EW = StopLightService.dir.EW;
            },true
        );
        $interval( StopLightService.toggle, 5000);
        });



angular.module('cityRoads.directives.StopLightDirective', [])
    .directive('stopLightDirective', function($compile){
    var getTemplate = function(contentType) {
            var template = '';
            switch(contentType) {
                case 'Light1':
                    template = '<div class="{{NS}}"></div>';
                    break;
                case 'Light2':
                    template = '<div class="{{EW}}"></div>';
                    break;
            }
            return template;
        }
    return {
        restrict: "A",
        replace: true,
        template: function (tElement, tAttrs) {
            return getTemplate(tAttrs.loc);
        }
    }


        //- should change colors based on stopLightService.
        //- use an attribute to determine which direction the stop light will use.
    });

angular.module('cityRoads.directives.StopLightSwitchDirective', [])
    .directive('stopLightSwitchDirective', function(){
        return{
            restrict:'A',
            scope:{
                press: '&'
            },
            template:'<input class="btn btn-primary btn-block" type="button" ng-click="press()" Value="Toggle Light">'
        }


        //- should contain button that will toggle stopLightService.
    });