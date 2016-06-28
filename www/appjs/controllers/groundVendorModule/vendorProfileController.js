'use strict';

angular.module('cmaManagementApp').controller('vendorProfileController',[
    'commonUtility',
    function(commonUtility){
		
        var vm = this;

        vm.onAboutClick = function(){
            commonUtility.redirectTo("vendorInfo");
        };

        vm.onPassClick = function(){
            commonUtility.redirectTo("");
        };

        vm.onEmailsClick = function(){
            commonUtility.redirectTo("");
        };

        vm.onPhoneClick = function(){
            commonUtility.redirectTo("");
        };

        vm.onBackClick = function(){
            commonUtility.redirectTo("groundVendorHome");
        };
    }
]);