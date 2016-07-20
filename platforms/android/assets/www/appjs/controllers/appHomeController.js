'use strict';

angular.module('cmaManagementApp').controller('appHomeController',
    function(commonUtility){

        var vm = this;

        vm.onServiceManagementClick = function(){
//            commonUtility.redirectTo("serviceManagementHome");
//            commonUtility.showAlert(navigator.app);
//            navigator.app.exitApp();
        };

        vm.onOnGroundVendorClick = function(){
            commonUtility.redirectTo("vendorLogin");
        };

        vm.onMonitoringGrpClick = function(){
            commonUtility.redirectTo("monitoringGroupHome");
        };

        vm.onUserManagementClick = function(){
            commonUtility.redirectTo("login");
        };

        vm.onUserRegistrationClick = function(){
            commonUtility.redirectTo("reg");
        };
        
});