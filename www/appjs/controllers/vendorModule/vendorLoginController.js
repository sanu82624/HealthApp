'use strict';

angular.module('cmaManagementApp').controller('vendorLoginController',
    function(constantLoader, vendorBusiness, commonUtility){
		
        var vm = this;

        vm.onLoginClick = function(frmData){
            if(!frmData.vendorLoginForm.$valid){
                return false;
            }
            vendorBusiness.validateVendor(vm.email, vm.pass).then(function(response){
                if(response.data.success){
                    commonUtility.setRootScopeProperty(
                        constantLoader.rootScopeTypes.IS_SIGN_IN, response.data.success);
                    commonUtility.setRootScopeProperty(
                        constantLoader.rootScopeTypes.NAME, response.data.result.name);
                    commonUtility.setRootScopeProperty(
                        constantLoader.rootScopeTypes.ID, response.data.result.vendId);
                    commonUtility.setRootScopeProperty(
                        constantLoader.rootScopeTypes.VEND_TYPE, response.data.result.vendType);
                    commonUtility.setRootScopeProperty(
                        constantLoader.rootScopeTypes.EMAIL, vm.email);
                    commonUtility.redirectTo(constantLoader.routeTypes.VENDOR_HOME);
                } else{
                    commonUtility.showAlert(constantLoader.messages.USER_LOGIN_WRONG);
                }
            }, function(error){
                commonUtility.showAlert(constantLoader.messages.USER_LOGIN_FAIL);
            });
        };
		
        vm.onCreateAccountClick = function(){
            commonUtility.redirectTo(constantLoader.routeTypes.VENDOR_REG);
        };
    }
);