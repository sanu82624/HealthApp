'use strict';

angular.module('cmaManagementApp')
  .directive('trueFalseRadio', function () {
    return {
        restricted: "E",
	replace: true,
        scope: {
            ngModel: '='
        },
        template: function(){
            
            var html =  '<div class="btn-group div-gap-8">' +
                            '<div class="btn-group">' +
                                '<button type="button" ng-click="ngModel=true" ' +
                                    'class="btn" ng-class="{\'btn-success\' : ngModel}">Active</button>' +
                            '</div>' +
                            '<div class="btn-group">' +
                                '<button type="button"  ng-click="ngModel=false" ' +
                                    'class="btn" ng-class="{\'btn-danger\' : !ngModel}">Inactive</button>' +
                            '</div>' +
                        '</div>';
            return html;
        }
    };
  });
