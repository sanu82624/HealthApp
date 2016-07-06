'use strict';

angular.module('cmaManagementApp').controller('vendorInfoEditController',
    function(constantLoader, vendorBusiness, commonUtility, generalUtility,
    $rootScope){
		
        var vm = this;
        vm.vendorInfo = {};

        vm.validName = constantLoader.validationPattern.NAME;
        vm.nameMsg = constantLoader.messages.VALID_NAME;
        vm.pinMsg = constantLoader.messages.REQ_PIN;
        vm.addressMsg = constantLoader.messages.REQ_ADDRESS;
        vm.countryMsg = constantLoader.messages.REQ_COUNTRY;
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
                commonUtility.showAlert(error.data);
            });
        }
        
        function loadVendorDetails(){
            vendorBusiness.loadVendorInfo($rootScope.ID).then(function(response){
                if(response.data.success){
                    vm.vendorInfo = response.data.result;
                }else{
                    commonUtility.showAlert(response.data.statusText);
                    commonUtility.redirectTo("vendorProfile");
                }
            }, function(error){
                commonUtility.showAlert(error.data);
                commonUtility.redirectTo("vendorProfile");
            });
        }
        
        vm.onSaveClick = function(frmData){
            if(!frmData.vendorInfoForm.$valid){
                return false;
            }
            var vendor = {};
            vendor.vendId = $rootScope.ID;
            vendor.name = vm.vendorInfo.name;
            vendor.pin = vm.vendorInfo.pin;
            vendor.description = vm.vendorInfo.description;
            vendor.address = vm.vendorInfo.address;
			
            vendorBusiness.updateVendorDetails(vendor).then(function(response){
                if(response.data.success){
                    $rootScope.NAME = vendor.name;
                    commonUtility.showAlert(response.data.statusText);
                    commonUtility.redirectTo("vendorProfile");
                } else{
                    commonUtility.showAlert(response.data.statusText);
                }
            }, function(error){
                commonUtility.showAlert(error.data);
            });
        };
		
        vm.onCancelClick = function(){
            commonUtility.redirectTo("vendorProfile");
        };

        initialized();
    }
);