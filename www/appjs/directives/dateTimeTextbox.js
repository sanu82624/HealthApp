'use strict';

angular.module('cmaManagementApp')
  .directive('dateTimeTextbox', function (constantLoader) {
    return {
        restricted: "E",
	replace: true,
        scope: {
            label: "@",
            for: "@",
            ngModelD: '=',
            ngModelH: '=',
            showValidation: "=",
            msg: "@"
        },
        template: function(element, attrs){
            
            var required = attrs.hasOwnProperty('required') ? "required='required'" : 
                constantLoader.defaultValues.BLANK_STRING;
            var isLabelShow = attrs.hasOwnProperty('label');
            var toDate = moment().format("YYYY-MM-DD");
        
            var html =  '<div class="form-group">' +
                            '<label class="ui-control-label" ng-show="' + isLabelShow + '">{{label}} ' + 
                                ((required !== constantLoader.defaultValues.BLANK_STRING)?
                                '*' : '') + '</label>' +
                            '<span class="error-msg-span" ' +
                                'data-ng-show="showValidation">{{msg | msgShow}}</span>' +
                            '<div style="display: block; width: 99%;">' +
                                '<input id="{{for}}" ' +
                                    'class="form-control ui-control-look ' +
                                    'ui-control-look-small ui-control-look-cal" ' +
                                    'type="date" ' + 
                                    'name="{{for}}" min="' + toDate + '" ' +
                                    'ng-model="ngModelD" ' + required + ' />' +
                                '<input id="{{for}}" ' +
                                    'class="form-control ui-control-look ' +
                                    'ui-control-look-smaller ui-control-look-time" ' +
                                    'type="time" ' + 
                                    'name="{{for}}" ' +
                                    'ng-model="ngModelH" ' + required + ' />' +
                            '</div>' +   
                        '</div>';
            return html;
        }
    };
  });
