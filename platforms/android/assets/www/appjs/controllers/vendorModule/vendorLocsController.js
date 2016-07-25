'use strict';

angular.module('cmaManagementApp').controller('vendorLocsController',
    function(constantLoader, vendorBusiness, commonUtility){
        
        var vm = this;
        vm.childVendors = [];
        
        function initialized(){
            loadLocations();
        }
        
        function loadLocations(){
            vendorBusiness.loadChildren(commonUtility.getRootScopeProperty(
                constantLoader.rootScopeTypes.ID)).then(function(response){
                if(response.data.success){
                    vm.childVendors = response.data.result;
                    for(var index=0; index<vm.childVendors.length; index++){
                        if(vm.childVendors[index].active){
                            vm.childVendors[index].active = 
                                constantLoader.defaultValues.ACTIVE;
                            vm.childVendors[index].badgeColor = 
                                constantLoader.defaultValues.BADGE_COLOR_ACTIVE;
                        }else{
                            vm.childVendors[index].active = 
                                constantLoader.defaultValues.INACTIVE;
                            vm.childVendors[index].badgeColor = 
                                constantLoader.defaultValues.BADGE_COLOR_INACTIVE;
                        }
                        if(vm.childVendors[index].contacts.length > 0){
                            vm.childVendors[index].phone = vm.childVendors[index].contacts[0];
                        }
                        vm.childVendors[index].itemColor = ((index % 2) > 0) ? "" : "list-alter-row";
                    }
                }else{
                    commonUtility.showAlert(response.data.statusText);
                }
            }, function(error){
                commonUtility.showAlert(error.data.statusText);
            });
        }
        
        vm.onAddLocClick = function(){
            commonUtility.deleteRootScopeProperty(constantLoader.rootScopeTypes.LOC_VEND_ID);
            commonUtility.redirectTo(constantLoader.routeTypes.VENDOR_LOC_EDIT);
        };
        
        vm.onCancelClick = function(){
            commonUtility.redirectTo(constantLoader.routeTypes.VENDOR_PROFILE);
        };
        
        vm.onVendorDetailsClick = function(locVendId){
            commonUtility.setRootScopeProperty(
                constantLoader.rootScopeTypes.LOC_VEND_ID, locVendId);
            commonUtility.redirectTo(constantLoader.routeTypes.VENDOR_LOC_VIEW);
        };
        
        initialized();
    });

