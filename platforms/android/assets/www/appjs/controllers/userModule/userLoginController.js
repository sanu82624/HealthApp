'use strict';

angular.module('cmaManagementApp').controller('userLoginController',
    function(constantLoader, userBusiness, commonUtility){
		
        var vm = this;

        vm.emailMsg = constantLoader.messages.VALID_EMAIL;
		
        vm.onLoginClick = function(frmData){
            if(!frmData.userLoginForm.$valid){
                return false;
            }
            userBusiness.validateUser(vm.email, vm.pass).then(function(response){
                if(response.data.success){
                    commonUtility.setRootScopeProperty(
                        constantLoader.rootScopeTypes.IS_SIGN_IN, response.data.success);
                    commonUtility.setRootScopeProperty(
                        constantLoader.rootScopeTypes.NAME, response.data.result.name);
                    commonUtility.setRootScopeProperty(
                        constantLoader.rootScopeTypes.ID, response.data.result.clientId);
                    commonUtility.setRootScopeProperty(
                        constantLoader.rootScopeTypes.EMAIL, vm.email);
                
                    commonUtility.redirectTo(constantLoader.routeTypes.USER_LANDING);
                } else{
                    commonUtility.showAlert(constantLoader.messages.USER_LOGIN_WRONG);
                }
            }, function(error){
                commonUtility.showAlert(constantLoader.messages.USER_LOGIN_FAIL);
            });
        };
		
        vm.onCreateAccountClick = function(){
            commonUtility.redirectTo(constantLoader.routeTypes.USER_REG);
        };
    }
);