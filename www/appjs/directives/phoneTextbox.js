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
            countryPhoneCode: "=",
            addButtonClick: "&",
            countries: "="
        },
        template: function(element, attrs){
            
            var required = attrs.hasOwnProperty('required') ? "required='required'" : 
                constantLoader.defaultValues.BLANK_STRING;
            var isAddbox = attrs.hasOwnProperty('addbox');
            var isEmergency = attrs.hasOwnProperty('emergency');
            
            var html =  '<div class="form-group">' +
                            ((!isAddbox)? ('<label>{{label}} ' + 
                                ((required !== constantLoader.defaultValues.BLANK_STRING)?
                                '*' : '') + '</label>' +
                            '<span class="error-msg-span" ' +
                                'data-ng-show="showValidation"> ' +
                                constantLoader.messages.VALID_PHONE +
                            '</span><br/>') : '') +
                            ((isEmergency) ? 
                            ('<select ng-model="countryPhoneCode" ' +
                                'id="comboEPhoneIsd" name="comboEPhoneIsd" ' +
                                'class="form-control" required style="width: 80px; display: inline;"' +
                                '<option data-ng-repeat="item in countries" ' +
                                    'value={{item.isdCode}} >{{item.isdCode}}</option>' +							
                            '</select>'):
                            '<span class="phone-code-field">{{countryPhoneCode}}</span>') +
                            '<input type="tel" id="{{for}}" name="{{for}}" ' +
                                'ng-pattern="' + constantLoader.validationPattern.PHONE + '" ' +
                                'class="form-control ' + (isAddbox ? 'phone-field-add' : 'phone-field') + '" ' +
                                'ng-model="ngModel" maxlength="10" ' + required + ' />' +
                            (isAddbox? 
                            ('<button class="btn btn-link btn-xs add-btn" ' +
                                'ng-click="onAddPhoneClick(showValidation);">' +
                                    'Add' +
                            '</button>') : '') +
                        '</div>';
            return html;
        },
        link: function(scope){
            scope.onAddPhoneClick = function(showValidation){
                scope.addButtonClick({
                    isValid: showValidation
                });
            };
        }
    };
  });
