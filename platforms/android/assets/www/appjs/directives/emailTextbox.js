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
            showValidation: "=",
            addButtonClick: "&"
        },
        template: function(element, attrs){
            
            var required = attrs.hasOwnProperty('required') ? "required='required'" : 
                constantLoader.defaultValues.BLANK_STRING;
            var isAddbox = attrs.hasOwnProperty('addbox');
        
            var html =  '<div class="form-group">' +
                            ((!isAddbox)? ('<label>{{label}} ' + 
                                ((required !== constantLoader.defaultValues.BLANK_STRING)?
                                '*' : '') + '</label>' +
                            '<span class="error-msg-span" ' +
                                'data-ng-show="showValidation"> ' +
                                constantLoader.messages.VALID_EMAIL +
                            '</span>') : '') +
                            '<input id="{{for}}" class="form-control' + (isAddbox ? ' add-box' : '') + '" ' +
                                'type="email" ' + 
                                'name="{{for}}" ng-pattern="' + constantLoader.validationPattern.EMAIL + 
                                '" ng-model="ngModel" ' + required + ' />' +
                            (isAddbox? 
                            ('<button class="btn btn-link btn-xs add-btn" ' +
                                'ng-click="onAddEmailClick(showValidation);">' +
                                    'Add' +
                            '</button>') : '') +
                        '</div>';
            return html;
        },
        link: function(scope){
            scope.onAddEmailClick = function(showValidation){
                scope.addButtonClick({
                    isValid: showValidation
                });
            };
        }
    };
  });
