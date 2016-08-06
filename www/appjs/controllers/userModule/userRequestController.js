'use strict';

angular.module('cmaManagementApp').controller('userRequestController',
    function(commonUtility, userBusiness, constantLoader, generalUtility,
    serviceLoader){
		
        var vm = this;
        vm.myRequests = [];
        vm.serviceTypes = [];
        vm.pageTitle = "";
        
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
        
        function getInProcFilteredRequests(requests){
            return requests.status === constantLoader.requestStatusTypes.WIP
                || requests.status === constantLoader.requestStatusTypes.DECLINED
                || requests.status === constantLoader.requestStatusTypes.ACCEPTED;
        }

        vm.onBacktoUserHome = function(){
            commonUtility.redirectTo(constantLoader.routeTypes.USER_LANDING);
        };
		
        vm.createNewRequest = function(serviceType){
            commonUtility.setRootScopeProperty(
                constantLoader.rootScopeTypes.REQ_TYPE, serviceType);
            commonUtility.redirectTo(constantLoader.routeTypes.USER_NEW_REQ_DETAILS);
        };
		
        vm.onLoadMyRequests = function(){
            userBusiness.loadMyRequests(commonUtility.getRootScopeProperty(
                constantLoader.rootScopeTypes.ID)).then(function(response){
                if(response.data.success){
                    
                    var statusCode = commonUtility.getRootScopeProperty(
                        constantLoader.rootScopeTypes.REQ_STATUS);
                    if(statusCode === constantLoader.requestStatusTypes.NONE){
                        vm.myRequests = response.data.result;
                        vm.pageTitle = "All";
                    }else if(statusCode === constantLoader.requestStatusTypes.WIP){
                        vm.myRequests = (serviceLoader.filter('filter')(response.data.result, 
                            getInProcFilteredRequests));
                        vm.pageTitle = "In Proc";
                    }else{
                        vm.myRequests = (serviceLoader.filter('filter')(response.data.result, 
                            {status: statusCode}));
                        vm.pageTitle = "Closed";
                    }
                    
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