'use strict';

angular.module('cmaManagementApp').controller('monitorAllVendorController',
    function(commonUtility, monitorBusiness, constantLoader, generalUtility){

        var vm = this;

        vm.serviceTypes = [];
        vm.vendors = [];
        vm.type = constantLoader.defaultValues.BLANK_STRING;
        vm.filterImageClass = constantLoader.defaultValues.BLANK_STRING;
        vm.isFilterShow = false;

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
                        loadVendors();
                    }
                } else{
                    commonUtility.showAlert(response.data.statusText);
                }
            }, function(error){
                commonUtility.showAlert(error.data.statusText);
            });
        }

        function loadVendors(){
            monitorBusiness.getVendors(vm.type).then(function(response){
                if(response.data.success){
                    vm.vendors = response.data.result;
                    var vendLocs = [];
                    var isAlterRow = false;
                    for(var index=(vm.vendors.length - 1); index>=0; index--){
                        if(commonUtility.is3DValidKey(vm.vendors[index].parentId)
                            && vm.type === constantLoader.defaultValues.VEND_TYPE_WITH_LOCATION){
                            vendLocs.push(vm.vendors[index]);
                            vm.vendors.splice(index, 1);
                        }else{
                            if(vm.vendors[index].active){
                                vm.vendors[index].active = 
                                    constantLoader.defaultValues.ACTIVE;
                                vm.vendors[index].badgeColor = 
                                    constantLoader.defaultValues.BADGE_COLOR_ACTIVE;
                            }else{
                                vm.vendors[index].active = 
                                    constantLoader.defaultValues.INACTIVE;
                                vm.vendors[index].badgeColor = 
                                    constantLoader.defaultValues.BADGE_COLOR_INACTIVE;
                            }
                            if(vm.vendors[index].contacts.length > 0){
                                vm.vendors[index].phone = vm.vendors[index].contacts[0];
                            }
                            vm.vendors[index].itemColor = isAlterRow ? "" : "list-alter-row";
                            isAlterRow = !isAlterRow;
                            if(vm.type === constantLoader.defaultValues.VEND_TYPE_WITH_LOCATION){
                                vm.vendors[index].locationCount = 0;
                            }
                        }
                    }
                    for(var indx=0; indx<vendLocs.length; indx++){
                        for(var count=0; count<vm.vendors.length; count++){
                            if(vendLocs[indx].parentId === vm.vendors[count].vendId){
                                vm.vendors[count].locationCount = vm.vendors[count].locationCount + 1;
                                break;
                            }
                        }
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
        
        vm.onServiceTypeChange = function(){
            loadVendors();
        };
		
        vm.onBackClick = function(){
            commonUtility.redirectTo(constantLoader.routeTypes.MONITOR_HOME);
        };
		
        vm.onVendorDetailsClick = function(vendId){
            commonUtility.setRootScopeProperty(
                constantLoader.rootScopeTypes.ASSOCIATE_ID, vendId);
            commonUtility.redirectTo(constantLoader.routeTypes.MONITOR_VENDOR_DETAILS);
        };

        initialize();
    }
);