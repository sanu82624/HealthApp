'use strict';

angular.module('cmaManagementApp')
  .directive('singleButton', function () {
    return {
        restricted: "E",
	replace: true,
        scope: {
            label: "@",
            onClick: "&"
        },
        template: function(){
            
            var html =  '<div class="btn-group btn-group-justified">' +
                            '<div class="btn-group action-btn-space">' +
                                '<button type="submit" ng-click="onButtonClick()" ' +
                                    'class="btn btn-primary">{{label}}</button>' +
                            '</div>' +
                        '</div>';
            return html;
        },
        link: function(scope){
            scope.onButtonClick = function(){
                scope.onClick();
            };
        }
    };
  });
