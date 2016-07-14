'use strict';

angular.module('cmaManagementApp').controller('vendorProfileController',
    function(commonUtility, constantLoader){
		
        var vm = this;

        vm.onAboutClick = function(){
            commonUtility.redirectTo("vendorInfo");
        };

        vm.onPassClick = function(){
            commonUtility.redirectTo("vendorPass");
        };

        vm.onEmailsClick = function(){
            commonUtility.redirectTo("vendorEmails");
        };

        vm.onPhoneClick = function(){
            commonUtility.setRootScopeProperty(
                constantLoader.rootScopeTypes.PHONE_TYPE,
                constantLoader.defaultValues.PHONE_TYPE_DEFAULT);
            commonUtility.redirectTo("vendorPhones");
        };
        
        vm.onMobileClick = function(){
            commonUtility.setRootScopeProperty(
                constantLoader.rootScopeTypes.PHONE_TYPE,
                (constantLoader.defaultValues.PHONE_TYPE_DEFAULT +
                    constantLoader.defaultValues.REQUEST_CHANNEL));
            commonUtility.redirectTo("vendorPhones");
        };

        vm.onBackClick = function(){
            commonUtility.redirectTo("groundVendorHome");
        };
        
        vm.onLocClick = function(){
            commonUtility.redirectTo("vendorLocs");
        };
    }
);