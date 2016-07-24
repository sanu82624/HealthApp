'use strict';

angular.module('cmaManagementApp')
  .directive('viewLocs', function () {
    return {
        restricted: "E",
	replace: true,
        scope: {
            label: "@",
            items: "=",
            locClick: "&"
        },
        template: function(){
            
            var html =  '<div class="view-details-item-div">' +
                            '<label class="view-details-item-label">{{label}}: </label>' +
                            '<span class="view-details-item-span">' +
                                '<span ng-repeat="loc in items" class="list-view-items">' +
                                    '{{loc.name}}&nbsp;' +
                                    '<img class="view-details-item-img" alt="" ' + 
                                        'src="images/go.png" ng-click="onLocClick(loc.vendId)" />' +
                                '</span>' +
                            '</span>' +
                        '</div>';
            return html;
        },
        link: function(scope){
            scope.onLocClick = function(locId){
                scope.locClick({id: locId});
            };
        }
    };
  });
