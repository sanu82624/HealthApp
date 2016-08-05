'use strict';

angular.module('cmaManagementApp')
    .filter('hideChar', function (constantLoader, commonUtility) {
        return function(input, outText) {
            
            if(!commonUtility.is3DValidKey(input)){
                return constantLoader.defaultValues.BLANK_STRING;
            }
            
            return input.replace(outText, 
                constantLoader.defaultValues.BLANK_STRING);
        };
    });