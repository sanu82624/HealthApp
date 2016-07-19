'use strict';

angular.module('cmaManagementApp').controller('vendorProfileController',
    function(commonUtility, constantLoader){
		
        var vm = this;

        vm.onAboutClick = function(){
            commonUtility.redirectTo(constantLoader.routeTypes.VENDOR_INFO);
        };

        vm.onPassClick = function(){
            commonUtility.redirectTo(constantLoader.routeTypes.VENDOR_PASS);
        };

        vm.onEmailsClick = function(){
            commonUtility.redirectTo(constantLoader.routeTypes.VENDOR_EMAIL);
        };

        vm.onPhoneClick = function(){
            commonUtility.setRootScopeProperty(
                constantLoader.rootScopeTypes.PHONE_TYPE,
                constantLoader.defaultValues.PHONE_TYPE_DEFAULT);
            commonUtility.redirectTo(constantLoader.routeTypes.VENDOR_PHONE);
        };
        
        vm.onMobileClick = function(){
            commonUtility.setRootScopeProperty(
                constantLoader.rootScopeTypes.PHONE_TYPE,
                constantLoader.defaultValues.MOBILE_TYPE_DEFAULT);
            commonUtility.redirectTo(constantLoader.routeTypes.VENDOR_PHONE);
        };

        vm.onBackClick = function(){
            commonUtility.redirectTo(constantLoader.routeTypes.VENDOR_HOME);
        };
        
        vm.onLocClick = function(){
            commonUtility.redirectTo(constantLoader.routeTypes.VENDOR_LOC);
        };
    }
);