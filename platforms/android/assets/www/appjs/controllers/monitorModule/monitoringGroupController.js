'use strict';

angular.module('cmaManagementApp').controller('monitoringGroupController',
    function(commonUtility, constantLoader){
	
        var vm = this;

        vm.onHomeClick = function(){
            commonUtility.redirectTo(constantLoader.routeTypes.APP_HOME);
        };

        vm.onVendorClick = function(){
            commonUtility.redirectTo(constantLoader.routeTypes.MONITOR_ALL_VENDOR);
        };
    }
);