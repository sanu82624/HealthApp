'use strict';

angular.module('cmaManagementApp')
  .directive('normalTextbox', function (constantLoader) {
    return {
        restricted: "E",
	replace: true,
	require: 'ngModel',
        scope: {
            label: "@",
            for: "@",
            ngModel: '=',
            showValidation: "=",
            msg: "@"
        },
        template: function(element, attrs){
            
            var required = attrs.hasOwnProperty('required') ? "required='required'" : 
                constantLoader.defaultValues.BLANK_STRING;
        
            var html =  '<div class="form-group">' +
                            '<label>{{label}} ' + 
                                ((required !== constantLoader.defaultValues.BLANK_STRING)?
                                '*' : '') + '</label>' +
                            '<span class="error-msg-span" ' +
                                'data-ng-show="showValidation">{{msg | msgShow}}</span>' +
                            '<input id="{{for}}" class="form-control" ' +
                                'type="text" ' + 
                                'name="{{for}}" ' +
                                '" ng-model="ngModel" ' + required + ' />' +
                        '</div>';
            return html;
        }
    };
  });
