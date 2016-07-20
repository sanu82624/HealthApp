'use strict';

angular.module('cmaManagementApp').controller('vendorPassController',
    function(constantLoader, vendorBusiness, commonUtility){
		
        var vm = this;

        vm.onSavePassClick = function(frmData){
            if(!frmData.vendorPassForm.$valid){
                return false;
            }
            
            if(vm.newPass !== vm.conPass){
                commonUtility.showAlert(constantLoader.messages.PASS_MISMATCH);
                return false;
            }
            
            vendorBusiness.changeVendorPassword(commonUtility.getRootScopeProperty(
                constantLoader.rootScopeTypes.EMAIL), vm.pass, vm.newPass).then(function(response){
                if(response.data.success){
                    commonUtility.showAlert((response.data.statusText + 
                        constantLoader.defaultValues.RELOGIN_AGAIN),
                        constantLoader.alertTypes.SUCCESS);
                    commonUtility.setRootScopeProperty(
                        constantLoader.rootScopeTypes.IS_SIGN_IN, false);
                    commonUtility.setRootScopeProperty(
                        constantLoader.rootScopeTypes.NAME, constantLoader.defaultValues.BLANK_STRING);
                    commonUtility.setRootScopeProperty(
                        constantLoader.rootScopeTypes.ID, constantLoader.defaultValues.BLANK_STRING);
                    commonUtility.setRootScopeProperty(
                        constantLoader.rootScopeTypes.VEND_TYPE, constantLoader.defaultValues.BLANK_STRING);
                    commonUtility.setRootScopeProperty(
                        constantLoader.rootScopeTypes.EMAIL, constantLoader.defaultValues.BLANK_STRING);
                    commonUtility.redirectTo(constantLoader.routeTypes.APP_HOME);
                } else{
                    commonUtility.showAlert(response.data.statusText);
                }
            }, function(error){
                commonUtility.showAlert(error.data.statusText);
            });
        };
		
        vm.onCancelClick = function(){
            commonUtility.redirectTo(constantLoader.routeTypes.VENDOR_PROFILE);
        };
    }
);