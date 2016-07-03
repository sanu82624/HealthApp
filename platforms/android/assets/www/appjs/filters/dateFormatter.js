'use strict';

angular.module('cmaManagementApp')
    .filter('dateFormatter', function (commonUtility) {
        return function(input) {
        
            return commonUtility.getDateFromString(input);
        };
    });