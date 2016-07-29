'use strict';

angular.module('cmaManagementApp').controller('userLandingController',
    function(commonUtility, constantLoader, userBusiness, serviceLoader){

        var vm = this;
        vm.inProcReqCount = 0;
        vm.closedReqCount = 0;
        vm.requestCount = 0;
        
        function initialized(){
            loadRequests();
        }
        
        function loadRequests(){
            userBusiness.loadMyRequests(commonUtility.getRootScopeProperty(
                constantLoader.rootScopeTypes.ID)).then(function(response){
                if(response.data.success){
                    vm.inProcReqCount = (serviceLoader.filter('filter')(response.data.result, 
                        getInProcFilteredRequests)).length;
                    vm.closedReqCount = (serviceLoader.filter('filter')(response.data.result, 
                        {status: constantLoader.requestStatusTypes.CLOSED})).length;
                    vm.requestCount = response.data.result.length;
                }else{
                    commonUtility.showAlert(response.data.statusText);
                }
            }, function(error){
                commonUtility.showAlert(error.data.statusText);
            });
        }
        
        function getInProcFilteredRequests(requests){
            return requests.status === constantLoader.requestStatusTypes.WIP
                || requests.status === constantLoader.requestStatusTypes.DECLINED;
        }

        vm.onNewRequestClick = function(){
            commonUtility.redirectTo(constantLoader.routeTypes.USER_NEW_REQ);
        };

        vm.onMyRequestClick = function(state){
            if(state === 0){
                state = constantLoader.requestStatusTypes.NONE;
            }else if(state === 1){
                state = constantLoader.requestStatusTypes.WIP;
            }else{
                state = constantLoader.requestStatusTypes.CLOSED;
            }
            commonUtility.setRootScopeProperty(
                constantLoader.rootScopeTypes.REQ_STATUS, state);
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