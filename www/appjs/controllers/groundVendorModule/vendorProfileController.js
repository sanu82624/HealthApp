'use strict';

angular.module('cmaManagementApp').controller('vendorProfileController',[
    'commonUtility',
    function(commonUtility){
		
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
            commonUtility.redirectTo("vendorPhones");
        };

        vm.onBackClick = function(){
            commonUtility.redirectTo("groundVendorHome");
        };
    }
]);