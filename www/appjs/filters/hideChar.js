'use strict';

angular.module('cmaManagementApp')
    .filter('hideChar', function (constantLoader) {
        return function(input, outText) {
        
            return input.replace(outText, 
                constantLoader.defaultValues.BLANK_STRING);
        };
    });