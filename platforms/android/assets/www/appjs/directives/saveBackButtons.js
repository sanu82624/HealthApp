'use strict';

angular.module('cmaManagementApp')
  .directive('saveBackButtons', function () {
    return {
        restricted: "E",
	replace: true,
        scope: {
            submitLabel: "@",
            cancelLabel: "@",
            onSubmitClick: "&",
            onCancelClick: "&"
        },
        template: function(){
            
            var html =  '<div class="btn-group btn-group-justified">' +
                            '<div class="btn-group">' +
                                '<button type="submit" ng-click="onClickSubmit()" ' +
                                    'class="btn btn-primary">{{submitLabel}}</button>' +
                            '</div>' +
                            '<div class="btn-group">' +
                                '<button type="button"  ng-click="onClickCancel()" ' +
                                    'class="btn btn-default">{{cancelLabel}}</button>' +
                            '</div>' +
                        '</div>';
            return html;
        },
        link: function(scope){
            scope.onClickSubmit = function(){
                scope.onSubmitClick();
            };
            
            scope.onClickCancel = function(){
                scope.onCancelClick();
            };
        }
    };
  });
