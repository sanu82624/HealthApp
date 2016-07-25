'use strict';

angular.module('cmaManagementApp').controller('monitorVendorDetailsController',
    function(commonUtility, vendorBusiness, constantLoader, generalUtility){

        var vm = this;

        vm.vendor = {};
        var serviceTypes = [];

        function initialize(){
            loadServiceTypes();
            loadVendor();
        }
        
        function loadServiceTypes(){
            generalUtility.loadServiceType().then(function(response){
                if(response.data.success){
                    if(response.data.result !== null){
                        angular.forEach(response.data.result, function(value, key) {
                            serviceTypes.push({
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
		
        function loadVendor(){
            if(commonUtility.is3DValidKey(commonUtility.getRootScopeProperty(
                constantLoader.rootScopeTypes.ID))){
                vendorBusiness.getVendorDetails(commonUtility.getRootScopeProperty(
                    constantLoader.rootScopeTypes.ID)).then(function(response){
                    if(response.data.success){
                        vm.vendor = response.data.result;
                        vm.vendor.badge = vm.vendor.active ? 
                            constantLoader.defaultValues.ACTIVE :
                            constantLoader.defaultValues.INACTIVE;
                        vm.vendor.badgeColor = vm.vendor.active ? 
                            constantLoader.defaultValues.BADGE_COLOR_ACTIVE :
                            constantLoader.defaultValues.BADGE_COLOR_INACTIVE;
                        var types = commonUtility.getFilterArray(serviceTypes, {code: vm.vendor.vendType});
                        if(types.length > 0){
                            vm.vendor.vendType = types[0].name;
                        }
                        loadLocations();
                    }else{
                        commonUtility.showAlert(response.data.statusText);
                    }
                }, function(error){
                    commonUtility.showAlert(error.data.statusText);
                });
            } else{
                
            }
        }
        
        function loadLocations(){
            vendorBusiness.loadChildren(commonUtility.getRootScopeProperty(
                constantLoader.rootScopeTypes.ID)).then(function(response){
                if(response.data.success){
                    vm.vendor.locations = response.data.result;
                }else{
                    commonUtility.showAlert(response.data.statusText);
                }
            }, function(error){
                commonUtility.showAlert(error.data.statusText);
            });
        }
		
        vm.onDetailsBackClick = function(){
            commonUtility.redirectTo("monitorAllVendor");
        };
        
        vm.onLocationClick = function(id){
            
        };
		
        initialize();
    });