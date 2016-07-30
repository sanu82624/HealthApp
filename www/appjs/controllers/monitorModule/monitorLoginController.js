'use strict';

angular.module('cmaManagementApp').controller('monitorLoginController',
    function(constantLoader, vendorBusiness, commonUtility){
		
        var vm = this;

        vm.onLoginClick = function(frmData){
            if(!frmData.monitorLoginForm.$valid){
                return false;
            }
//            vendorBusiness.validateVendor(vm.email, vm.pass).then(function(response){
//                if(response.data.success){
//                    commonUtility.setRootScopeProperty(
//                        constantLoader.rootScopeTypes.IS_SIGN_IN, response.data.success);
//                    commonUtility.setRootScopeProperty(
//                        constantLoader.rootScopeTypes.NAME, response.data.result.name);
//                    commonUtility.setRootScopeProperty(
//                        constantLoader.rootScopeTypes.ID, response.data.result.vendId);
//                    commonUtility.setRootScopeProperty(
//                        constantLoader.rootScopeTypes.VEND_TYPE, response.data.result.vendType);
//                    commonUtility.setRootScopeProperty(
//                        constantLoader.rootScopeTypes.EMAIL, vm.email);
//                    commonUtility.setRootScopeProperty(
//                        constantLoader.rootScopeTypes.USER_TYPE, constantLoader.userTypes.VENDOR);
//                    commonUtility.setRootScopeProperty(
//                        constantLoader.rootScopeTypes.IS_USER_TYPE_SHOW, true);
                    commonUtility.redirectTo(constantLoader.routeTypes.MONITOR_HOME);
//                } else{
//                    commonUtility.showAlert(constantLoader.messages.USER_LOGIN_WRONG);
//                }
//            }, function(error){
//                commonUtility.showAlert(constantLoader.messages.USER_LOGIN_FAIL);
//            });
        };
		
        vm.onCreateAccountClick = function(){
//            commonUtility.redirectTo(constantLoader.routeTypes.VENDOR_REG);
        };
    }
);