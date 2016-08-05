'use strict';

angular.module('cmaManagementApp').controller('appHomeController',
    function(commonUtility, constantLoader){

        var vm = this;
        vm.menuImageClass = constantLoader.defaultValues.BLANK_STRING;
        vm.isMenuShow = false;
        
        function showHideMenu(){
            vm.menuImageClass = (vm.menuImageClass === 
                constantLoader.defaultValues.BLANK_STRING) ?
                "arrow-side-opp" : constantLoader.defaultValues.BLANK_STRING;
            vm.isMenuShow = !(vm.menuImageClass === 
                constantLoader.defaultValues.BLANK_STRING);
        }

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
            showHideMenu();
        };
        
        vm.onHomeClick = function(){
            showHideMenu();
            commonUtility.deleteAllRootScopeProperty();
            commonUtility.redirectTo(constantLoader.routeTypes.APP_HOME);
        };
        
        vm.onAboutClick = function(){
            showHideMenu();
            commonUtility.redirectTo(constantLoader.routeTypes.COMMON_ABOUT);
        };
        
        vm.onContactClick = function(){
            showHideMenu();
            commonUtility.redirectTo(constantLoader.routeTypes.COMMON_CONTACT);
        };
        
        vm.onWorkClick = function(){
            showHideMenu();
            commonUtility.redirectTo(constantLoader.routeTypes.COMMON_WORK);
        };
});