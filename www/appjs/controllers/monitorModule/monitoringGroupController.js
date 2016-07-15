'use strict';

angular.module('cmaManagementApp').controller('monitoringGroupController',[
    'commonUtility',
    function(commonUtility){
	
        var vm = this;

        vm.onHomeClick = function(){
            commonUtility.redirectTo("appHome");
        };

        vm.onVendorClick = function(){
            commonUtility.redirectTo("monitorAllVendor");
        };
    }
]);