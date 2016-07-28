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
        template: function(element, attrs){
            
            var loginPage = attrs.hasOwnProperty('login') ? "btn-success" : "btn-default";
            var redLeft = attrs.hasOwnProperty('redLeft') ? "btn-danger" : "btn-primary";
            
            var html =  '<div class="btn-group btn-group-justified div-gap-8">' +
                            '<div class="btn-group">' +
                                '<button type="submit" ng-click="onClickSubmit()" ' +
                                    'class="btn ' + redLeft + '">{{submitLabel}}</button>' +
                            '</div>' +
                            '<div class="btn-group">' +
                                '<button type="button"  ng-click="onClickCancel()" ' +
                                    'class="btn ' + loginPage + '">{{cancelLabel}}</button>' +
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
