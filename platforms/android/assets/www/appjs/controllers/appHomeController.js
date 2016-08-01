'use strict';

angular.module('cmaManagementApp').controller('appHomeController',
    function(commonUtility, constantLoader){

        var vm = this;
        vm.menuImageClass = constantLoader.defaultValues.BLANK_STRING;
        vm.isMenuShow = false;

        vm.onServiceManagementClick = function(){
//            commonUtility.redirectTo("serviceManagementHome");
//            console.log(navigator);
//            navigator.app.exitApp();
//            window.close();

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
        
        vm.onMenuClick = function(){
            vm.menuImageClass = (vm.menuImageClass === 
                constantLoader.defaultValues.BLANK_STRING) ?
                "arrow-side-opp" : constantLoader.defaultValues.BLANK_STRING;
            vm.isMenuShow = !(vm.menuImageClass === 
                constantLoader.defaultValues.BLANK_STRING);
        };
        
        vm.onAboutClick = function(){
            vm.onMenuClick();
            commonUtility.redirectTo(constantLoader.routeTypes.COMMON_ABOUT);
        };
        
        vm.onContactClick = function(){
            vm.onMenuClick();
            commonUtility.redirectTo(constantLoader.routeTypes.COMMON_CONTACT);
        };
        
        vm.onWorkClick = function(){
            vm.onMenuClick();
            commonUtility.redirectTo(constantLoader.routeTypes.COMMON_WORK);
        };
});