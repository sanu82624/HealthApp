'use strict';

angular.module('cmaManagementApp')
  .directive('emailTextbox', function (constantLoader) {
    return {
        restricted: "E",
	replace: true,
	require: 'ngModel',
        scope: {
            label: "@",
            for: "@",
            ngModel: '=',
            showValidation: "="
        },
        template: function(element, attrs){
            
            var required = attrs.hasOwnProperty('required') ? "required='required'" : 
                constantLoader.defaultValues.BLANK_STRING;
            
            var html =  '<div class="form-group">' +
                            '<label>{{label}} ' + 
                                ((required !== constantLoader.defaultValues.BLANK_STRING)?
                                '*' : '') + '</label>' +
                            '<span class="error-msg-span" ' +
                                'data-ng-show="showValidation"> ' +
                                constantLoader.messages.VALID_EMAIL +
                            '</span>' +
                            '<input id="{{for}}" class="form-control" ' +
                                'type="email" ' + 
                                'name="{{for}}" ng-pattern="' + constantLoader.validationPattern.EMAIL + 
                                '" ng-model="ngModel" ' + required + ' />' +
                        '</div>';
            return html;
        }
    };
  });
