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
            addButtonClick: "&"
        },
        template: function(){
            
            var html =  '<div class="form-group">' +
                            '<input type="text" id="{{for}}" name="{{for}}" ng-model="ngModel" ' +
                                'class="form-control add-textbox-wid">' +
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


