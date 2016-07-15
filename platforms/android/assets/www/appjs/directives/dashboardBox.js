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
            
            var iconColor = 'orange';
            if(attrs.hasOwnProperty('red')){
                iconColor = 'red';
            }else if(attrs.hasOwnProperty('blue')){
                iconColor = 'blue';
            }
        
            var html =  '<div class="dash-div-box" ng-click="onDashClick()">' +
                            isNotification +
                            '<i class="glyphicon glyphicon-' + attrs.icon + ' ' + iconColor +
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
