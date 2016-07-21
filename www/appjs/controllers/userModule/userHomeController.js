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
            commonUtility.redirectTo(constantLoader.routeTypes.USER_NEW_REQ);
        };

        vm.onMyRequestClick = function(){
            commonUtility.redirectTo(constantLoader.routeTypes.USER_MY_REQ);
        };

        vm.onProfileClick = function(){
            commonUtility.redirectTo(constantLoader.routeTypes.USER_PROFILE);
        };

        vm.onLogoutClick = function(){
            commonUtility.deleteAllRootScopeProperty();
            commonUtility.redirectTo(constantLoader.routeTypes.APP_HOME);
        };
        
        initialized();
    }
);