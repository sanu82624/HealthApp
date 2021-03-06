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
            msg: "@",
            showValidation: "=",
            readOnly: "=",
            selectionChanged: "&",
            icon: "@",
            specials: "@"
        },
        template: function(element, attrs){
            
            var isReadOnly = angular.isDefined(attrs.readOnly)? "readOnly" : "false";
            var required = attrs.hasOwnProperty('required') ? "required='required'" : 
                constantLoader.defaultValues.BLANK_STRING;
            var isSelect = attrs.hasOwnProperty('sel');
            var iconCss = attrs.hasOwnProperty('icon') ? ("ui-control-look-" + attrs.icon) : "";
            var isLabelShow = attrs.hasOwnProperty('label');
            var modelItem = attrs.hasOwnProperty('modelBinding') ? 
                ("item." + attrs.modelBinding) : "item";
            var labelItem = attrs.hasOwnProperty('labelBinding') ? 
                ("item." + attrs.labelBinding) : "item";
            
            var html =  '<div class="form-group">' +
                            '<div ng-show="' + isLabelShow + '">' +
                                '<label class="ui-control-label">{{label}} ' + 
                                    ((required !== constantLoader.defaultValues.BLANK_STRING)?
                                    '*' : '') + '</label>' +
                                '<span class="error-msg-span" ' +
                                    'data-ng-show="showValidation"> ' +
                                    '{{msg | msgShow}}'+
                                '</span>' +
                            '</div>' +
                            '<select ng-model="ngModel" ng-disabled="' + isReadOnly + '" ' +
                                'id="{{for}}" name="{{for}}" ' +
                                'class="form-control ui-control-look ' + iconCss + '" ' 
                                + required + ' >' +
                                (isSelect ?
                                ('<option value="" class="combo-please-select-text">' + 
                                    constantLoader.defaultValues.COMBO_SELECT_MSG + '</option>') : '') +
                                '<option data-ng-repeat="item in items" ' +
                                    'value={{' + modelItem + 
                                    '}} >{{' + labelItem + '}}</option>' +
                            '</select>' +
                        '</div>';
        
            return html;
        },
        link: function(scope){
            
            var previouslySelectedItem = constantLoader.defaultValues.BLANK_STRING;
            scope.$watch("ngModel", function (newValue) {

                if (newValue !== previouslySelectedItem) {

                    scope.selectionChanged();
                    previouslySelectedItem = newValue;
                }
            });
        }
    };
  });
