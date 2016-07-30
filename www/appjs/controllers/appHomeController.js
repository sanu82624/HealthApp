'use strict';

angular.module('cmaManagementApp').controller('appHomeController',
    function(commonUtility, constantLoader){

        var vm = this;

        vm.onServiceManagementClick = function(){
//            commonUtility.redirectTo("serviceManagementHome");
//            commonUtility.showAlert(navigator.app);
//            navigator.app.exitApp();
        };

        vm.onVendorClick = function(){
            commonUtility.redirectTo(constantLoader.routeTypes.VENDOR_LOGIN);
        };

        vm.onMonitorClick = function(){
            commonUtility.redirectTo(constantLoader.routeTypes.MONITOR_LOGIN);
        };

        vm.onUserClick = function(){
            commonUtility.redirectTo(constantLoader.routeTypes.USER_LOGIN);
        };
});