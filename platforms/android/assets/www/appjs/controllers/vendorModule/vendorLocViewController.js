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
            commonUtility.setRootScopeProperty(
                constantLoader.rootScopeTypes.LOC_VEND_ID, 
                constantLoader.defaultValues.BLANK_STRING);
            commonUtility.redirectTo(constantLoader.routeTypes.VENDOR_LOC);
        };
        
        initialized();
    });

