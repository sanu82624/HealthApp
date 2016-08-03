'use strict';

angular.module('cmaManagementApp')
  .directive('viewItems', function () {
    return {
        restricted: "E",
	replace: true,
        scope: {
            label: "@",
            items: "="
        },
        template: function(){
            
            var html =  '<div class="view-details-item-div">' +
                            '<label class="view-details-item-label">{{label}}: </label>' +
                            '<span class="view-details-item-span">' +
                                '<span ng-repeat="item in items" class="list-view-items">' +
                                    '{{item}}' +
                                '</span>' +
                            '</span>' +
                        '</div>';
            return html;
        }
    };
  });
