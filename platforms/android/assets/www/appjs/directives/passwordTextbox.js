'use strict';

angular.module('cmaManagementApp')
  .directive('passwordTextbox', function (constantLoader) {
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
            var isStrength = attrs.hasOwnProperty('strength');
        
            var html =  '<div class="form-group">' +
                            '<label class="ui-control-label">{{label}} ' + 
                                ((required !== constantLoader.defaultValues.BLANK_STRING)?
                                '*' : '') + '</label>' +
                            '<span class="error-msg-span" ' +
                                'data-ng-show="showValidation"> ' +
                                constantLoader.messages.VALID_PASS +
                            '</span>' +
                            '<input type="password" id="{{for}}" name="{{for}}" ' +
                                'ng-model="ngModel" placeholder="' + 
                                constantLoader.controlSuggestions.PASS + '" ' + 
                                'class="form-control ui-control-look ui-control-look-pass" ' 
                                + required + '/>' +
                            (isStrength ?
                            ('<div ng-password-strength="ngModel" strength="strngth" ' +
                                'calculation-mode="formula" inner-class="progress-bar" ' +
                                'inner-class-prefix="pass-strgth-pbar progress-bar-"></div>') : '') +
                        '</div>';
            return html;
        }
    };
  });


