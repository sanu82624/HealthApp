'use strict';

angular.module('cmaManagementApp')
    .run(function(commonUtility, constantLoader){
        
        commonUtility.setRootScopeProperty(
            constantLoader.rootScopeTypes.IS_SHOW_ALERT, true);
    });

