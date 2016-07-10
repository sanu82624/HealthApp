'use strict';

angular.module('cmaManagementApp')
    .filter('msgShow', function (constantLoader) {
        return function(input) {
        
            return constantLoader.messages[input];
        };
    });