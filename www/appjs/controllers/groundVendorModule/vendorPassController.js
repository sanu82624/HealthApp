'use strict';

angular.module('cmaManagementApp').controller('vendorPassController',[
    'messages', 'vendorBusiness', 'commonUtility', '$rootScope',
    function(messages, vendorBusiness, commonUtility, $rootScope){
		
        var vm = this;

        vm.passMsg = messages.VALID_PASS;
        
        vm.onSavePassClick = function(frmData){
            if(!frmData.vendorPassForm.$valid){
                return false;
            }
            
            if(vm.newPass !== vm.conPass){
                window.alert(messages.PASS_MISMATCH);
                return false;
            }
            
            vendorBusiness.changeVendorPassword($rootScope.EMAIL, vm.pass, vm.newPass).then(function(response){
                if(response.data.success){
                    window.alert(response.data.statusText + "\nRelogin again.");
                    $rootScope.ID = "";
                    $rootScope.IS_SIGN_IN = false;
                    $rootScope.NAME = "";
                    $rootScope.EMAIL = "";
                    commonUtility.redirectTo("appHome");
                } else{
                     window.alert(response.data.statusText);
                }
            }, function(error){
                window.alert(error.data);
            });
        };
		
        vm.onCancelClick = function(){
            commonUtility.redirectTo("vendorProfile");
        };
    }
]);