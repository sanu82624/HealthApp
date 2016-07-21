'use strict';

angular.module('cmaManagementApp')
  .directive('singleLineList', function () {
    return {
        restricted: "E",
	replace: true,
        scope: {
            items: "=",
            onDeleteClick: "&"
        },
        template: function(){
            
            var html =  '<div class="list-group list-group-single">' +
                            '<div ng-repeat="item in items" class="list-group-item ' +
                                '{{((($index%2)>0)?\'list-opp-alter-row-single\':\'list-alter-row-single\')}}">' +
                                '<div class="list-group-div-text-block-single">' +
                                    '<h6 class="list-group-item-text">{{item | hideChar: \'|\'}}</h6>' +
                                '</div>' +
                                '<div class="list-group-div-btn-block-single">' +
                                    '<img class="" alt="" src="images/delete.gif" ' +
                                        'ng-click="deleteClick(item)" />' +
                                '</div>' +
                            '</div>' +
                        '</div>';
            return html;
        },
        link: function(scope){
            scope.deleteClick = function(item){
                scope.onDeleteClick({item: item});
            };
        }
    };
  });
