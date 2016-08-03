'use strict';

angular.module('cmaManagementApp').controller('monitorAllClientController',
    function(commonUtility, monitorBusiness, constantLoader){

        var vm = this;
        vm.clients = [];
        vm.filterImageClass = constantLoader.defaultValues.BLANK_STRING;
        vm.isFilterShow = false;

        function initialize(){
            loadClients();
        }
        
        function loadClients(){
            monitorBusiness.getClients().then(function(response){
                if(response.data.success){
                    vm.clients = response.data.result;
                    var isAlterRow = false;
                    for(var index=(vm.clients.length - 1); index>=0; index--){
                        if(commonUtility.is3DValidKey(vm.clients[index].phone)){
                            if(vm.clients[index].phone.length > 0){
                                vm.clients[index].phone = vm.clients[index].phone[0];
                            } else{
                                vm.clients[index].phone = constantLoader.defaultValues.BLANK_STRING;
                            }
                        }
                        vm.clients[index].itemColor = isAlterRow ? "" : "list-alter-row";
                        isAlterRow = !isAlterRow;
                    }
                }else{
                    commonUtility.showAlert(response.data.statusText);
                }
            }, function(error){
                commonUtility.showAlert(error.data.statusText);
            });
        }
        
        vm.onFilterClick = function(){
            vm.filterImageClass = (vm.filterImageClass === 
                constantLoader.defaultValues.BLANK_STRING) ?
                "header-filter-img-down" : constantLoader.defaultValues.BLANK_STRING;
            vm.isFilterShow = !(vm.filterImageClass === 
                constantLoader.defaultValues.BLANK_STRING);
        };
        	
        vm.onBackClick = function(){
            commonUtility.redirectTo(constantLoader.routeTypes.MONITOR_HOME);
        };
		
        vm.onClientDetailsClick = function(clientId){
            commonUtility.setRootScopeProperty(
                constantLoader.rootScopeTypes.ASSOCIATE_ID, clientId);
//            commonUtility.redirectTo(constantLoader.routeTypes.MONITOR_VENDOR_DETAILS);
        };

        initialize();
    }
);