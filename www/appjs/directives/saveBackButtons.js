'use strict';

angular.module('cmaManagementApp')
  .directive('saveBackButtons', function () {
    return {
        restricted: "E",
	replace: true,
        scope: {
            submitLabel: "@",
            cancelLabel: "@",
            middleLabel: "@",
            onSubmitClick: "&",
            onCancelClick: "&",
            onMiddleClick: "&"
        },
        template: function(element, attrs){
            
            var loginPage = attrs.hasOwnProperty('login') ? "btn-success" : "btn-default";
            var submitButtonTheme = attrs.hasOwnProperty('redLeft') ? "btn-danger" : "btn-primary";
            submitButtonTheme = attrs.hasOwnProperty('greenLeft') ? "btn-success" : submitButtonTheme;
            
            var html =  '<div class="btn-group btn-group-justified div-gap-8">' +
                            '<div class="btn-group">' +
                                '<button type="submit" ng-click="onClickSubmit()" ' +
                                    'class="btn ' + submitButtonTheme + '">{{submitLabel}}</button>' +
                            '</div>' +
                            (attrs.hasOwnProperty('middleLabel') ?
                            ('<div class="btn-group">' +
                                '<button type="button"  ng-click="onClickMiddle()" ' +
                                    'class="btn btn-danger">{{middleLabel}}</button>' +
                            '</div>') : '') +
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
            
            scope.onClickMiddle = function(){
                scope.onMiddleClick();
            };
        }
    };
  });
