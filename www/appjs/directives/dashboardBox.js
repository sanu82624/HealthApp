'use strict';

angular.module('cmaManagementApp')
  .directive('dashboardBox', function (constantLoader) {
    return {
        restricted: "E",
	replace: true,
        scope: {
            label: "@",
            icon: "@",
            notifyNumber: "@",
            onClick: "&"
        },
        template: function(element, attrs){
            
            var isNotification = attrs.hasOwnProperty('notify') ? 
                ('<span class="box-notification">{{notifyNumber}}</span>') : 
                constantLoader.defaultValues.BLANK_STRING;
        
            var html =  '<div class="dash-div-box" ng-click="onDashClick()">' +
                            isNotification +
                            '<i class="glyphicon glyphicon-' + attrs.icon + ' orange' + 
                            ((isNotification !== constantLoader.defaultValues.BLANK_STRING) ?
                                ' left-margin-20' : '') + '"></i>' +
                            '<div class="box-text">{{label}}</div>' +
                        '</div>';
            return html;
        },
        link: function(scope){
            scope.onDashClick = function(){
                scope.onClick();
            };
        }
    };
  });
