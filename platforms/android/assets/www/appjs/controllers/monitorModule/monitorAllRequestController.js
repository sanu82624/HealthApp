'use strict';

angular.module('cmaManagementApp').controller('monitorAllRequestController',
    function(commonUtility, monitorBusiness, constantLoader, generalUtility){

        var vm = this;

        vm.serviceTypes = [];
        vm.requests = {};
        vm.type = constantLoader.defaultValues.BLANK_STRING;

        function initialize(){
            loadServiceTypes();
        }
        
        function loadServiceTypes(){
            generalUtility.loadServiceType().then(function(response){
                if(response.data.success){
                    if(response.data.result !== null){
                        angular.forEach(response.data.result, function(value, key) {
                            vm.serviceTypes.push({
                                code: key,
                                name: value
                            });
                        });
                        vm.type = vm.serviceTypes[0].code;
                        loadRequests();
                    }
                } else{
                    commonUtility.showAlert(response.data.statusText);
                }
            }, function(error){
                commonUtility.showAlert(error.data.statusText);
            });
        }

        function loadRequests(){
            monitorBusiness.getRequests(vm.type).then(function(response){
                if(response.data.success){
                    vm.requests = response.data.result;
                    var isAlterRow = false;
                    for(var index=(vm.requests.length - 1); index>=0; index--){
//                        if(vm.requests[index].active){
//                            vm.requests[index].active = 
//                                constantLoader.defaultValues.ACTIVE;
//                            vm.requests[index].badgeColor = 
//                                constantLoader.defaultValues.BADGE_COLOR_ACTIVE;
//                        }else{
//                            vm.requests[index].active = 
//                                constantLoader.defaultValues.INACTIVE;
//                            vm.requests[index].badgeColor = 
//                                constantLoader.defaultValues.BADGE_COLOR_INACTIVE;
//                        }

                        vm.requests[index].itemColor = isAlterRow ? "" : "list-alter-row";
                        isAlterRow = !isAlterRow;
                    }
                }else{
                    commonUtility.showAlert(response.data.statusText);
                }
            }, function(error){
                commonUtility.showAlert(error.data.statusText);
            });
        }
        
        vm.onServiceTypeChange = function(){
            loadRequests();
        };
		
        vm.onBackClick = function(){
            commonUtility.redirectTo(constantLoader.routeTypes.MONITOR_HOME);
        };
	
        initialize();
    }
);