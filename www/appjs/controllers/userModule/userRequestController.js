'use strict';

angular.module('cmaManagementApp').controller('userRequestController',
    function(commonUtility, userBusiness, constantLoader, generalUtility){
		
        var vm = this;
        vm.myRequests = [];

        vm.serviceTypes = [];
        
        function initialized(){
            loadServiceTypes();
        }
        
        function loadServiceTypes(){
            generalUtility.loadServiceType().then(function(response){
                if(response.data.success){
                    if(response.data.result !== null){
                        angular.forEach(response.data.result, function(value, key) {
                            if(key === "ASST"){
                                value = "Med. Asst.";
                            }
                            vm.serviceTypes.push({
                                code: key,
                                name: value
                            });
                        });
                    }
                } else{
                    commonUtility.showAlert(response.data.statusText);
                }
            }, function(error){
                commonUtility.showAlert(error.data.statusText);
            });
        }

        vm.onBacktoUserHome = function(){
            commonUtility.redirectTo(constantLoader.routeTypes.USER_LANDING);
        };
		
        vm.createNewRequest = function(serviceType){
            var request = {};
            request.requestType = serviceType;
            request.clientId = commonUtility.getRootScopeProperty(
                constantLoader.rootScopeTypes.ID);
            request.channel = constantLoader.defaultValues.REQUEST_CHANNEL;

            userBusiness.createNewRequest(request).then(function(response){
                if(response.data.success){
                    commonUtility.showAlert(response.data.statusText,
                        constantLoader.alertTypes.SUCCESS);
                    commonUtility.redirectTo(constantLoader.routeTypes.USER_LANDING);
                }else{
                    commonUtility.showAlert(response.data.statusText);
                }
            }, function(error){
                commonUtility.showAlert(error.data.statusText);
            });
        };
		
        vm.onLoadMyRequests = function(){
            userBusiness.loadMyRequests(commonUtility.getRootScopeProperty(
                constantLoader.rootScopeTypes.ID)).then(function(response){
                if(response.data.success){
                    vm.myRequests = response.data.result;
                    for(var index=0; index<vm.myRequests.length; index++){
                        var item = commonUtility.getFilterArray(vm.serviceTypes, 
                            {code: vm.myRequests[index].requestType});
                        if(item.length > 0){
                            vm.myRequests[index].requestType = item[0].name;
                        }
                        
                        var status = commonUtility.getFilterArray(
                            commonUtility.getJsonFromString(constantLoader.defaultValues.REQ_STATUSES),
                            {code: vm.myRequests[index].status});
                        if(status.length > 0){
                            vm.myRequests[index].statusColor = status[0].color;
                        }
                    }
                }else{
                    commonUtility.showAlert(response.data.statusText);
                }
            }, function(error){
                commonUtility.showAlert(error.data.statusText);
            });
        };
        
        initialized();
    }
);