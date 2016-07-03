'use strict';

angular.module('cmaManagementApp')
  .directive('phoneTextbox', function (constantLoader) {
    return {
        restricted: "E",
	replace: true,
	require: 'ngModel',
        scope: {
            label: "@",
            for: "@",
            ngModel: '=',
            showValidation: "=",
            countryPhoneCode: "="
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
                                constantLoader.messages.VALID_PHONE +
                            '</span><br/>' +
                            '<span class="phone-code-field">{{countryPhoneCode}}</span>' +
                            '<input type="text" id="{{for}}" name="{{for}}" ' +
                                'ng-pattern="' + constantLoader.validationPattern.PHONE + '" ' +
                                'class="form-control phone-field" ' +
                                'ng-model="ngModel" maxlength="10" ' + required + ' />' +
                        '</div>';
            return html;
        }
    };
  });
