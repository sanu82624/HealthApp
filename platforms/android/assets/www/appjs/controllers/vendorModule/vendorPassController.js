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
                    commonUtility.showAlert(response.data.statusText + "\nRelogin again.");
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
                    commonUtility.redirectTo("appHome");
                } else{
                    commonUtility.showAlert(response.data.statusText);
                }
            }, function(error){
                commonUtility.showAlert(error.data.statusText);
            });
        };
		
        vm.onCancelClick = function(){
            commonUtility.redirectTo("vendorProfile");
        };
    }
);