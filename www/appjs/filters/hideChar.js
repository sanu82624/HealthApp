'use strict';

angular.module('cmaManagementApp')
    .filter('hideChar', function () {
        return function(input) {
        
            return input.replace("|", "");
        };
    });