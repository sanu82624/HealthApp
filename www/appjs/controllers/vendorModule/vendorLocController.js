'use strict';

angular.module('cmaManagementApp').controller('vendorLocController',
    function(constantLoader, vendorBusiness, commonUtility, generalUtility){
        
        var vm = this;
        
        vm.countryPhoneCode = constantLoader.defaultValues.BLANK_ISD_CODE;
        vm.countryList = [];
        vm.isNew = true;
        
        function initialized(){
            loadCountries();
        }
        
        function loadCountries(){
            generalUtility.loadCountries().then(function(response){
                if(response.data.success){
                    vm.countryList = commonUtility.getCustomSortedList(response.data.result, 
                        constantLoader.defaultValues.COUNTRY_ENDED_LIST, 
                        constantLoader.defaultValues.COUNTRY_SEARCH_FIELD,
                        constantLoader.defaultValues.COUNTRY_SORT_FIELD);
                        
                    if(commonUtility.is3DValidKey(
                        commonUtility.getRootScopeProperty(
                        constantLoader.rootScopeTypes.LOC_VEND_ID))){
                        loadVendorLocationDetails();
                    }
                } else{
                    commonUtility.showAlert(response.data.statusText);
                }
            }, function(error){
                commonUtility.showAlert(error.data.statusText);
            });
        }
        
        function loadVendorLocationDetails(){
            vendorBusiness.getVendorDetails(
                commonUtility.getRootScopeProperty(
                constantLoader.rootScopeTypes.LOC_VEND_ID)).then(function(response){
                if(response.data.success){
                    vm.vendor = response.data.result;
                    if(angular.isDefined(vm.vendor.contacts) && 
                        vm.vendor.contacts.length > 0){
                        var phoneCode = commonUtility.getSplitArray(
                            vm.vendor.contacts[0], 
                            constantLoader.defaultValues.ISD_SEPARATOR);
                        if(phoneCode.length > 1){
                            vm.countryPhoneCode = phoneCode[0];
                            vm.vendor.phone = phoneCode[1];
                        }
                    }
                    vm.isNew = false;
                }else{
                    commonUtility.showAlert(response.data.statusText);
                }
            }, function(error){
                commonUtility.showAlert(error.data.statusText);
            });
        }
        
        function saveNewLocation(){
            var vendorInfo = {};
            vendorInfo.login = commonUtility.randomString();
            vendorInfo.password = "1";
            vendorInfo.vendorDetails = {};
            vendorInfo.vendorDetails.name = vm.vendor.name;
            vendorInfo.vendorDetails.vendType = commonUtility.getRootScopeProperty(
                constantLoader.rootScopeTypes.VEND_TYPE);
            vendorInfo.vendorDetails.address = vm.vendor.address;
            vendorInfo.vendorDetails.country = vm.vendor.country;
            vendorInfo.vendorDetails.state = vm.vendor.state;
            vendorInfo.vendorDetails.city = vm.vendor.city;
            vendorInfo.vendorDetails.description = vm.vendor.description;
            vendorInfo.vendorDetails.pin = vm.vendor.pin;
            vendorInfo.vendorDetails.contacts = [vm.countryPhoneCode + 
                constantLoader.defaultValues.ISD_SEPARATOR + vm.vendor.phone];
            vendorInfo.vendorDetails.active = true;
            vendorInfo.vendorDetails.parentId = commonUtility.getRootScopeProperty(
                constantLoader.rootScopeTypes.ID);
            
            vendorBusiness.registerVendor(vendorInfo).then(function(response){
                if(response.data.success){
                    commonUtility.showAlert(constantLoader.messages.VEND_LOC_CREATE);
                    commonUtility.redirectTo(constantLoader.routeTypes.VENDOR_LOC);
                } else{
                    commonUtility.showAlert(response.data.statusText);
                }
            }, function(error){
                commonUtility.showAlert(error.data.statusText);
            });
        }
        
        function updateLocation(){
            var vendorInfo = {};
            vendorInfo.vendId = commonUtility.getRootScopeProperty(
                constantLoader.rootScopeTypes.LOC_VEND_ID);
            vendorInfo.name = vm.vendor.name;
            vendorInfo.pin = vm.vendor.pin;
            vendorInfo.description = vm.vendor.description;
            vendorInfo.address = vm.vendor.address;
            vendorInfo.country = vm.vendor.country;
            vendorInfo.state = vm.vendor.state;
            vendorInfo.city = vm.vendor.city;
            vendorInfo.contacts = [vm.countryPhoneCode + 
                constantLoader.defaultValues.ISD_SEPARATOR + vm.vendor.phone];
            
            vendorBusiness.updateVendorDetails(vendorInfo).then(function(response){
                if(response.data.success){
                    commonUtility.showAlert(constantLoader.messages.LOC_UPDATE);
                    commonUtility.redirectTo(constantLoader.routeTypes.VENDOR_LOC);
                } else{
                    commonUtility.showAlert(response.data.statusText);
                }
            }, function(error){
                commonUtility.showAlert(error.data.statusText);
            });
        }
        
        vm.onSaveClick = function(frmData){
            if(!frmData.vendorLocForm.$valid){
                return false;
            }
            
            if(vm.isNew){
                saveNewLocation();
            }else{
                updateLocation();
            }
        };
        
        vm.onCancelClick = function(){
            commonUtility.redirectTo(constantLoader.routeTypes.VENDOR_LOC);
        };
        
        initialized();
    });

