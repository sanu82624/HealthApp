'use strict';

angular.module('cmaManagementApp').controller('userHomeController',
    function(commonUtility, constantLoader, userBusiness){

        var vm = this;
        vm.myRequestCount = 0;
        
        function initialized(){
            loadRequests();
        }
        
        function loadRequests(){
            userBusiness.loadMyRequests(commonUtility.getRootScopeProperty(
                constantLoader.rootScopeTypes.ID)).then(function(response){
                if(response.data.success){
                    if(response.data.result !== null){
                        vm.myRequestCount = response.data.result.length;
                    }
                }else{
                    commonUtility.showAlert(response.data.statusText);
                }
            }, function(error){
                commonUtility.showAlert(error.data.statusText);
            });
        }

        vm.onNewRequestClick = function(){
            commonUtility.redirectTo("newReq");
        };

        vm.onMyRequestClick = function(){
            commonUtility.redirectTo("myReq");
        };

        vm.onProfileClick = function(){
            commonUtility.redirectTo("userProfile");
        };

        vm.onLogoutClick = function(){
            commonUtility.setRootScopeProperty(
                constantLoader.rootScopeTypes.IS_SIGN_IN, false);
            commonUtility.setRootScopeProperty(
                constantLoader.rootScopeTypes.NAME, constantLoader.defaultValues.BLANK_STRING);
            commonUtility.setRootScopeProperty(
                constantLoader.rootScopeTypes.ID, constantLoader.defaultValues.BLANK_STRING);
            commonUtility.setRootScopeProperty(
                constantLoader.rootScopeTypes.EMAIL, constantLoader.defaultValues.BLANK_STRING);
        
            commonUtility.redirectTo("appHome");
        };
        
        initialized();
    }
);