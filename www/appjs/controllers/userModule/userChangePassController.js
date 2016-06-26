'use strict';

angular.module('cmaManagementApp').controller('userChangePassController',[
    'messages', 'userBusiness', 'commonUtility', '$rootScope',
    function(messages, userBusiness, commonUtility, $rootScope){
		
        var vm = this;

        vm.passMsg = messages.VALID_PASS;
        
        vm.onSavePassClick = function(frmData){
            if(!frmData.userPassForm.$valid){
                return false;
            }
            
            if(vm.newPass !== vm.conPass){
                window.alert(messages.PASS_MISMATCH);
                return false;
            }
            
            userBusiness.changeUserPAssword($rootScope.EMAIL, vm.pass, vm.newPass).then(function(response){
                if(response.data.success){
                    if(response.data.success){
                        window.alert(response.data.statusText + "\nRelogin again.");
                        $rootScope.ClientId = "";
                        $rootScope.IS_SIGN_IN = false;
                        $rootScope.NAME = "";
                        $rootScope.EMAIL = "";
                        commonUtility.redirectTo("appHome");
                    } else{
                         window.alert(response.data.statusText);
                    }
                } else{
                    window.alert(messages.USER_REG_FAIL);
                }
            }, function(error){
                window.alert(messages.USER_REG_FAIL);
            });
        };
		
        vm.onCancelClick = function(){
            commonUtility.redirectTo("userProfile");
        };
    }
]);