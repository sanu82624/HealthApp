'use strict';

angular.module('cmaManagementApp')
  .directive('addTextbox', function () {
    return {
        restricted: "E",
	replace: true,
	require: 'ngModel',
        scope: {
            for: "@",
            ngModel: '=',
            addButtonClick: "&",
            icon: "@",
            suggestion: "@"
        },
        template: function(element, attrs){
            
            var iconCss = attrs.hasOwnProperty('icon') ? 
                (" ui-control-look ui-control-look-" + attrs.icon) : "";
            
            var html =  '<div class="form-group">' +
                            '<input type="text" id="{{for}}" name="{{for}}" ng-model="ngModel" ' +
                                'placeholder="{{suggestion | sugShow}}" ' +
                                'class="form-control' + iconCss + ' add-textbox-wid">' +
                            '<button class="btn btn-link btn-xs add-btn" ' +
                                'ng-click="onAddClick();">' +
                                    'Add' +
                            '</button>' +
                        '</div>';
            return html;
        },
        link: function(scope){
            scope.onAddClick = function(){
                scope.addButtonClick();
            };
        }
    };
  });


