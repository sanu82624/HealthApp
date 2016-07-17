'use strict';

angular.module('cmaManagementApp')
    .filter('sugShow', function (constantLoader) {
        return function(input) {
        
            return constantLoader.controlSuggestions[input];
        };
    });