'use strict';

angular.module('cmaManagementApp').controller('monitorVendorDetailsController',
    function(commonUtility, vendorBusiness, constantLoader){

        var vm = this;

        vm.vendor = {};

        function initialize(){
            loadVendor();
        }
		
        function loadVendor(){
            if(commonUtility.is3DValidKey(commonUtility.getRootScopeProperty(
                constantLoader.rootScopeTypes.ID))){
                vendorBusiness.getVendorDetails(commonUtility.getRootScopeProperty(
                    constantLoader.rootScopeTypes.ID)).then(function(response){
                    if(response.data.success){
                        vm.vendor = response.data.result;
                    }
                }, function(error){
                    commonUtility.redirectTo("monitorAllVendor");
                });
            } else{
                
            }
        }
		
        vm.onDetailsBackClick = function(){
            commonUtility.redirectTo("monitorAllVendor");
        };
		
        initialize();
    });