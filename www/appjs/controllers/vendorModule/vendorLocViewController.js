'use strict';

angular.module('cmaManagementApp').controller('vendorLocViewController',
    function(constantLoader, vendorBusiness, commonUtility){
        
        var vm = this;
        vm.vendor = {};
        
        function initialized(){
            loadVendorLocationDetails();
        }
        
        function loadVendorLocationDetails(){
            vendorBusiness.getVendorDetails(
                commonUtility.getRootScopeProperty(
                constantLoader.rootScopeTypes.LOC_VEND_ID)).then(function(response){
                if(response.data.success){
                    vm.vendor = response.data.result;
                    vm.vendor.badge = vm.vendor.active ? 
                        constantLoader.defaultValues.ACTIVE :
                        constantLoader.defaultValues.INACTIVE;
                    vm.vendor.badgeColor = vm.vendor.active ? 
                        constantLoader.defaultValues.BADGE_COLOR_ACTIVE :
                        constantLoader.defaultValues.BADGE_COLOR_INACTIVE;
                }else{
                    commonUtility.showAlert(response.data.statusText);
                }
            }, function(error){
                commonUtility.showAlert(error.data.statusText);
            });
        }
        
        vm.onEditLocClick = function(){
            commonUtility.redirectTo(constantLoader.routeTypes.VENDOR_LOC_EDIT);
        };
        
        vm.onBackClick = function(){
            commonUtility.deleteRootScopeProperty(
                constantLoader.rootScopeTypes.LOC_VEND_ID);
            commonUtility.redirectTo(constantLoader.routeTypes.VENDOR_LOC);
        };
        
        initialized();
    });

