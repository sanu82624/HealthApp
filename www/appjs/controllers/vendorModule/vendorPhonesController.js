'use strict';

angular.module('cmaManagementApp').controller('vendorPhonesController',
    function(commonUtility, vendorBusiness, constantLoader, generalUtility){

        var vm = this;
        vm.phones = [];
        vm.countryPhoneCode = constantLoader.defaultValues.BLANK_ISD_CODE;
        vm.countryList = [];
        
        function initialization(){
            loadPhones();
            loadCountries();
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
        
        function loadPhones(){
            vendorBusiness.loadVendorInfo(commonUtility.getRootScopeProperty(
                constantLoader.rootScopeTypes.ID)).then(function(response){
                if(response.data.success){
                    if(angular.isDefined(response.data.result.contacts) &&
                        response.data.result.contacts !== null){
                        vm.phones = response.data.result.contacts;
                        if(vm.phones.length > 0){
                            vm.countryPhoneCode = vm.phones[0].substr(0, 
                                vm.phones[0].indexOf(constantLoader.defaultValues.ISD_SEPARATOR));
                        }
                    }
                }else{
                    commonUtility.showAlert(response.data.statusText);
                    commonUtility.redirectTo("vendorProfile");
                }
            }, function(error){
                commonUtility.showAlert(error.data);
                commonUtility.redirectTo("vendorProfile");
            });
        };

        vm.onBackClick = function(){
            commonUtility.redirectTo("vendorProfile");
        };

        vm.onAddPhoneClick = function(isNotValidPhone){
            if(isNotValidPhone || vm.phone === "" || 
                vm.phone === null || angular.isUndefined(vm.phone)){
                commonUtility.showAlert(constantLoader.messages.VALID_PHONE);
                return false;
            }
            for(var index=0; index<=vm.phones.length - 1; index++){
                if(vm.phones[index] === vm.phone){
                    vm.phone = "";
                    commonUtility.showAlert(constantLoader.messages.ALREADY_ADDED);
                    return false;
                }
            }
            vm.phones.push(vm.countryPhoneCode + 
                constantLoader.defaultValues.ISD_SEPARATOR + vm.phone);
            vm.phone = "";
        };

        vm.onPhoneDeleteClick = function(record){
            for(var index=0; index<=vm.phones.length - 1; index++){
                if(vm.phones[index] === record){
                    vm.phones.splice(index, 1);
                    return;
                }
            }
        };
        
        vm.onSaveClick = function(){
            var vendor = {};
            vendor.vendId = commonUtility.getRootScopeProperty(
                constantLoader.rootScopeTypes.ID);
            vendor.contacts = vm.phones;
            vendorBusiness.updateVendorDetails(vendor).then(function(response){
                commonUtility.showAlert(response.data.statusText);
                if(response.data.success){
                    commonUtility.redirectTo("vendorProfile");
                }
            }, function(error){
                commonUtility.showAlert(error.data.statusText);
            });
        };
        
        initialization();
    }
);