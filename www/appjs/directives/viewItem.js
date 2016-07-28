'use strict';

angular.module('cmaManagementApp')
  .directive('viewItem', function () {
    return {
        restricted: "E",
	replace: true,
        scope: {
            label: "@",
            model: "@",
            badge: "@",
            color: "@",
            labelCss: "@"
        },
        template: function(element, attrs){
            
            var badgeBgColor = attrs.hasOwnProperty('color') ? 
                ("background-{{color}}") : "";
            var badgeHtml = attrs.hasOwnProperty('badge') ? 
                ('<span class="badge ' + badgeBgColor + '">{{badge}}</span>') : '';
            var labelItem = attrs.hasOwnProperty('labelCss') ?
                '<span class="label label-{{labelCss}}">{{model}}</span>' : '';
            
            var html =  '<div class="view-details-item-div">' +
                            '<label class="view-details-item-label">{{label}}: </label>' +
                            ((labelItem === '')?
                            ('<span class="view-details-item-span">' +
                                '{{model}}' + badgeHtml +
                            '</span>') : labelItem) +
                        '</div>';
            return html;
        }
    };
  });
