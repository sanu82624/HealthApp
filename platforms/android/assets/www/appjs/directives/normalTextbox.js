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
            msg: "@",
            icon: "@",
            suggestion: "@"
        },
        template: function(element, attrs){
            
            var required = attrs.hasOwnProperty('required') ? "required='required'" : 
                constantLoader.defaultValues.BLANK_STRING;
            var iconCss = attrs.hasOwnProperty('icon') ? ("ui-control-look-" + attrs.icon) : "";
            var isLabelShow = attrs.hasOwnProperty('label');
        
            var html =  '<div class="form-group">' +
                            '<label class="ui-control-label" ng-show="' + isLabelShow + '">{{label}} ' + 
                                ((required !== constantLoader.defaultValues.BLANK_STRING)?
                                '*' : '') + '</label>' +
                            '<span class="error-msg-span" ' +
                                'data-ng-show="showValidation">{{msg | msgShow}}</span>' +
                            '<input id="{{for}}" placeholder="{{suggestion | sugShow}}" ' +
                                'class="form-control ui-control-look ' + iconCss + '" ' +
                                'type="text" ' + 
                                'name="{{for}}" ' +
                                '" ng-model="ngModel" ' + required + ' />' +
                        '</div>';
            return html;
        }
    };
  });
