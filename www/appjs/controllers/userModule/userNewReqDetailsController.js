'use strict';

angular.module('cmaManagementApp').controller('userNewReqDetailsController',
    function(constantLoader, userBusiness, commonUtility){
		
        var vm = this;

        vm.userInfo = {};
        vm.reqFor = commonUtility.getRootScopeProperty(constantLoader.rootScopeTypes.REQ_TYPE);
        vm.actionDate = new Date(moment().format("YYYY-MM-DD"));
        vm.actionTime = new Date(moment().format("YYYY-MM-DD HH:mm"));
        
        function initialized(){
            loadUserInfo();
        }
        
        function loadUserInfo(){
            userBusiness.loadUserInfo(commonUtility.getRootScopeProperty(
                constantLoader.rootScopeTypes.ID)).then(function(response){
                if(response.data.success){
                    vm.userInfo = response.data.result;
                }else{
                    commonUtility.showAlert(response.data.statusText);
                    commonUtility.redirectTo(constantLoader.routeTypes.USER_LAND);
                }
            }, function(error){
                commonUtility.redirectTo(constantLoader.routeTypes.USER_LAND);
            });
        }

        vm.onSubmitClick = function(frmData){
            if(!frmData.userReqDetailsForm.$valid){
                return false;
            }
            
            var request = {};
            request.requestType = commonUtility.getRootScopeProperty(
                constantLoader.rootScopeTypes.REQ_TYPE);
            request.clientId = commonUtility.getRootScopeProperty(
                constantLoader.rootScopeTypes.ID);
            request.channel = constantLoader.defaultValues.REQUEST_CHANNEL;

            userBusiness.createNewRequest(request).then(function(response){
                if(response.data.success){
                    commonUtility.showAlert(response.data.statusText,
                        constantLoader.alertTypes.SUCCESS);
                    commonUtility.deleteRootScopeProperty(constantLoader.rootScopeTypes.REQ_TYPE);
                    commonUtility.redirectTo(constantLoader.routeTypes.USER_LAND);
                }else{
                    commonUtility.showAlert(response.data.statusText);
                }
            }, function(error){
                commonUtility.showAlert(error.data.statusText);
            });
        };
		
        vm.onCancelClick = function(){
            commonUtility.deleteRootScopeProperty(constantLoader.rootScopeTypes.REQ_TYPE);
            commonUtility.redirectTo(constantLoader.routeTypes.USER_LAND);
        };
        
        initialized();
    }
);