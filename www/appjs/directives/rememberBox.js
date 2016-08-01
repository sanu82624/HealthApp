'use strict';

angular.module('cmaManagementApp')
  .directive('rememberBox', function (constantLoader) {
    return {
        restricted: "E",
	replace: true,
	require: 'ngModel',
        scope: {
            for: "@",
            ngModel: '='
        },
        template: function(){
            
            var html =  '<div class="checkbox checkbox-primary">' +
                            '<input type="checkbox" ng-model="ngModel" id="{{for}}" />' +
                            '<label for="{{for}}">' + 
                                constantLoader.defaultValues.REMEMBER_TEXT + '</label>' +
                        '</div>';
            return html;
        }
    };
  });
