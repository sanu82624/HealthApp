'use strict';

angular.module('cmaManagementApp')
  .directive('dashboardPicBox', function () {
    return {
        restricted: "E",
	replace: true,
        scope: {
            label: "@",
            icon: "@",
            onClick: "&"
        },
        template: function(){
           
            var html =  '<div class="dash-div-box-big-pic ' +
                            'dash-div-box-big-pic-{{icon}}" ' +
                            'ng-click="onDashClick()">{{label}}</div>';
            return html;
        },
        link: function(scope){
            scope.onDashClick = function(){
                scope.onClick();
            };
        }
    };
  });
