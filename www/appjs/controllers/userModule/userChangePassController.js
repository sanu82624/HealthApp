'use strict';

angular.module('cmaManagementApp').controller('userChangePassController',
    function(constantLoader, userBusiness, commonUtility, $rootScope){
		
        var vm = this;

        vm.onSavePassClick = function(frmData){
            if(!frmData.userPassForm.$valid){
                return false;
            }
            
            if(vm.newPass !== vm.conPass){
                commonUtility.showAlert(constantLoader.messages.PASS_MISMATCH);
                return false;
            }
            
            userBusiness.changeUserPAssword($rootScope.EMAIL, vm.pass, vm.newPass).then(function(response){
                if(response.data.success){
                    commonUtility.showAlert(response.data.statusText + "\nRelogin again.");
                    $rootScope.ID = "";
                    $rootScope.IS_SIGN_IN = false;
                    $rootScope.NAME = "";
                    $rootScope.EMAIL = "";
                    commonUtility.redirectTo("appHome");
                } else{
                    commonUtility.showAlert(response.data.statusText);
                }
            }, function(error){
                commonUtility.showAlert(error.data);
            });
        };
		
        vm.onCancelClick = function(){
            commonUtility.redirectTo("userProfile");
        };
    }
);