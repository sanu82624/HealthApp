'use strict';

angular.module('cmaManagementApp').controller('userLoginController',
    function(constantLoader, userBusiness, commonUtility, localStorages){
		
        var vm = this;
        vm.isRemember = false;
        vm.emailMsg = constantLoader.messages.VALID_EMAIL;
        
        function initialized(){
            loadRememberedStorage();
        }
        
        function loadRememberedStorage(){
            if(commonUtility.is3DValidKey(
                localStorages.get(constantLoader.storageTypes.CLIENT_UID)) &&
                commonUtility.is3DValidKey(
                localStorages.get(constantLoader.storageTypes.CLIENT_PASS))){
                vm.email = localStorages.get(constantLoader.storageTypes.CLIENT_UID);
                vm.pass = localStorages.get(constantLoader.storageTypes.CLIENT_PASS);
                vm.isRemember = true;
            }
        }
        
        function setRememberedStorage(){
            if(vm.isRemember){
                localStorages.set(constantLoader.storageTypes.CLIENT_UID, vm.email);
                localStorages.set(constantLoader.storageTypes.CLIENT_PASS, vm.pass);
            }else{
                localStorages.remove(constantLoader.storageTypes.CLIENT_UID);
                localStorages.remove(constantLoader.storageTypes.CLIENT_PASS);
            }
        }
        
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
                    commonUtility.setRootScopeProperty(
                        constantLoader.rootScopeTypes.USER_TYPE, constantLoader.userTypes.CLIENT);
                    commonUtility.setRootScopeProperty(
                        constantLoader.rootScopeTypes.IS_USER_TYPE_SHOW, false);
                
                    setRememberedStorage();
                    commonUtility.redirectTo(constantLoader.routeTypes.USER_LAND);
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
        
        initialized();
    }
);