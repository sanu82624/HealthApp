'use strict';

angular.module('cmaManagementApp')
  .filter('rootScopeShow', function (commonUtility, constantLoader) {
    return function (input) {
        
        if (!commonUtility.is3DValidKey(input)){
            return constantLoader.defaultValues.BLANK_STRING; 
        }
        
        return constantLoader.rootScopeTypes[input];
    };
  });
