'use strict';

angular.module('cmaManagementApp').controller('groundVendorLoginController',
    function(constantLoader, vendorBusiness, commonUtility, $rootScope){
		
        var vm = this;

        vm.emailMsg = constantLoader.messages.VALID_EMAIL;
        vm.passMsg = constantLoader.messages.VALID_PASS;

        vm.onLoginClick = function(){
            vendorBusiness.validateVendor(vm.email, vm.pass).then(function(response){
                if(response.data.success){
                    $rootScope.IS_SIGN_IN = response.data.success;
                    $rootScope.NAME = response.data.result.name;
                    $rootScope.ID = response.data.result.vendId;
                    $rootScope.vendorType = response.data.result.vendType;
                    $rootScope.EMAIL = vm.email;
                    commonUtility.redirectTo("groundVendorHome");
                } else{
                    commonUtility.showAlert(constantLoader.messages.USER_LOGIN_WRONG);
                }
            }, function(error){
                commonUtility.showAlert(constantLoader.messages.USER_LOGIN_FAIL);
            });
        };
		
        vm.onCreateAccountClick = function(){
            commonUtility.redirectTo("vendorReg");
        };
    }
);