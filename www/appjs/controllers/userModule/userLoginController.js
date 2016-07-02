'use strict';

angular.module('cmaManagementApp').controller('userLoginController',
    function(constantLoader, userBusiness, commonUtility, $rootScope){
		
        var vm = this;

        vm.emailMsg = constantLoader.messages.VALID_EMAIL;
        vm.passMsg = constantLoader.messages.VALID_PASS;
		
        vm.onLoginClick = function(frmData){
            if(!frmData.userLoginForm.$valid){
                return false;
            }
            userBusiness.validateUser(vm.email, vm.pass).then(function(response){
                if(response.data.success){
                    $rootScope.ID = response.data.result.clientId;
                    $rootScope.IS_SIGN_IN = response.data.success;
                    $rootScope.NAME = response.data.result.name;
                    $rootScope.EMAIL = vm.email;
                    commonUtility.redirectTo("userLanding");
                } else{
                    commonUtility.showAlert(constantLoader.messages.USER_LOGIN_WRONG);
                }
            }, function(error){
                commonUtility.showAlert(constantLoader.messages.USER_LOGIN_FAIL);
            });
        };
		
        vm.onCreateAccountClick = function(){
            commonUtility.redirectTo("reg");
        };
    }
);