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
                }else{
                    commonUtility.showAlert(response.data.statusText);
                }
            }, function(error){
                commonUtility.showAlert(error.data.statusText);
            });
        }
        
        vm.onAddLocClick = function(){
            commonUtility.redirectTo("vendorLocEdit");
        };
        
        vm.onCancelClick = function(){
            commonUtility.redirectTo("vendorProfile");
        };
        
        vm.onVendorDetailsClick = function(vendId){
            
        };
        
        initialized();
    });

