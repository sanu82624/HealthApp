'use strict';

angular.module('cmaManagementApp').controller('vendorInfoEditController',
    function(constantLoader, vendorBusiness, commonUtility, generalUtility){
		
        var vm = this;
        vm.vendorInfo = {};
        vm.countryList = [];
        
        function initialized(){
            loadCountries();
            loadVendorDetails();
        }
        
        function loadCountries(){
            generalUtility.loadCountries().then(function(response){
                if(response.data.success){
                    vm.countryList = commonUtility.getCustomSortedList(response.data.result, 
                        constantLoader.defaultValues.COUNTRY_ENDED_LIST, 
                        constantLoader.defaultValues.COUNTRY_SEARCH_FIELD,
                        constantLoader.defaultValues.COUNTRY_SORT_FIELD);
                } else{
                    commonUtility.showAlert(response.data.statusText);
                }
            }, function(error){
                commonUtility.showAlert(error.data.statusText);
            });
        }
        
        function loadVendorDetails(){
            vendorBusiness.loadVendorInfo(commonUtility.getRootScopeProperty(
                constantLoader.rootScopeTypes.ID)).then(function(response){
                if(response.data.success){
                    vm.vendorInfo = response.data.result;
                }else{
                    commonUtility.showAlert(response.data.statusText);
                    commonUtility.redirectTo("vendorProfile");
                }
            }, function(error){
                commonUtility.showAlert(error.data.statusText);
                commonUtility.redirectTo("vendorProfile");
            });
        }
        
        vm.onSaveClick = function(frmData){
            if(!frmData.vendorInfoForm.$valid){
                return false;
            }
            var vendor = {};
            vendor.vendId = commonUtility.getRootScopeProperty(
                constantLoader.rootScopeTypes.ID);
            vendor.name = vm.vendorInfo.name;
            vendor.pin = vm.vendorInfo.pin;
            vendor.description = vm.vendorInfo.description;
            vendor.address = vm.vendorInfo.address;
            vendor.country = vm.vendorInfo.country;
            vendor.state = vm.vendorInfo.state;
            vendor.city = vm.vendorInfo.city;
			
            vendorBusiness.updateVendorDetails(vendor).then(function(response){
                if(response.data.success){
                    commonUtility.setRootScopeProperty(
                        constantLoader.rootScopeTypes.NAME, vendor.name);
                    commonUtility.showAlert(response.data.statusText);
                    commonUtility.redirectTo("vendorProfile");
                } else{
                    commonUtility.showAlert(response.data.statusText);
                }
            }, function(error){
                commonUtility.showAlert(error.data.statusText);
            });
        };
		
        vm.onCancelClick = function(){
            commonUtility.redirectTo("vendorProfile");
        };

        initialized();
    }
);