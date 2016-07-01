'use strict';

angular.module('cmaManagementApp')
  .directive('combobox', function (constantLoader) {
    return {
        restricted: "E",
	replace: true,
        scope: {
            label: "@",
            for: "@",
            labelBinding: "@",
            modelBinding: "@",
            ngModel: '=',
            items: '=',
            msg: "=",
            showValidation: "=",
            readOnly: "=",
            selectionChanged: "&"
        },
        template: function(element, attrs){
            
            var isReadOnly = angular.isDefined(attrs.readOnly)? "readOnly" : "false";
            var required = attrs.hasOwnProperty('required') ? "required='required'" : 
                constantLoader.defaultValues.BLANK_STRING;
            var isSelect = attrs.hasOwnProperty('sel');
            var html =  '<div class="form-group">' +
                            '<label>{{label}} ' + 
                                ((required !== constantLoader.defaultValues.BLANK_STRING)?
                                '*' : '') + '</label>' +
                            '<span class="error-msg-span" ' +
                                'data-ng-show="showValidation"> ' +
                                '{{msg}}'+
                            '</span>' +
                            '<select ng-model="ngModel" ng-disabled="' + isReadOnly + '" ' +
                                'id="{{for}}" name="{{for}}" ' +
                                'class="form-control" ' + required + ' >' +
                                (isSelect ?
                                ('<option value="">' + constantLoader.defaultValues.COMBO_SELECT_MSG + '</option>') : '') +
                                '<option data-ng-repeat="item in items" ' +
                                    'value={{item.' + attrs.modelBinding + '}} >{{item.' + attrs.labelBinding + '}}</option>' +							
                            '</select>' +
                        '</div>';
        
            return html;
        },
        link: function(scope){
            
            var previouslySelectedItem = constantLoader.defaultValues.BLANK_STRING;
            scope.$watch("ngModel", function (newValue) {

                if (newValue !== previouslySelectedItem && angular.isDefined(newValue)) {

                    scope.selectionChanged();
                    previouslySelectedItem = newValue;
                }
            });
        }
    };
  });
