'use strict';

angular.module('cmaManagementApp')
  .directive('showAlert', function (commonUtility) {
    return {
        restricted: "E",
	replace: true,
        scope: {
            
        },
        template: function(){
            
            var html =  '<div class="show-alert-outer-div fade" ' +
                            'ng-hide="$parent.IS_SHOW_ALERT" ng-click="onClick()">' +
                            '<div class="alert alert-{{$parent.ALERT_TYPE | lowercase}} ' +
                                'show-alert-div show-alert-{{$parent.ALERT_TYPE | lowercase}}">' +
                                '<strong>{{$parent.ALERT_TYPE}}:</strong> {{$parent.ALERT_MSG}} ' +
                            '</div>' +
                        '</div>';
            return html;
        },
        link: function(scope){
            scope.onClick = function(){
                commonUtility.closeAlert();
            };
        }
    };
  });
