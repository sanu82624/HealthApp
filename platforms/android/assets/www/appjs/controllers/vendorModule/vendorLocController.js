'use strict';

angular.module('cmaManagementApp').controller('vendorLocController',
    function(constantLoader, vendorBusiness, commonUtility, generalUtility){
        
        var vm = this;
        
        vm.countryPhoneCode = constantLoader.defaultValues.BLANK_ISD_CODE;
        vm.countryList = [];
        
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
            var vendorInfo = {};
            vendorInfo.login = commonUtility.randomString();
            vendorInfo.password = "1";
            vendorInfo.vendorDetails = {};
            vendorInfo.vendorDetails.name = vm.name;
            vendorInfo.vendorDetails.vendType = commonUtility.getRootScopeProperty(
                constantLoader.rootScopeTypes.VEND_TYPE);
            vendorInfo.vendorDetails.address = vm.address;
            vendorInfo.vendorDetails.country = vm.country;
            vendorInfo.vendorDetails.state = vm.state;
            vendorInfo.vendorDetails.city = vm.city;
            vendorInfo.vendorDetails.description = vm.desc;
            vendorInfo.vendorDetails.pin = vm.pinCode;
            vendorInfo.vendorDetails.contacts = [vm.countryPhoneCode + 
                constantLoader.defaultValues.ISD_SEPARATOR + vm.phone];
            vendorInfo.vendorDetails.active = true;
            vendorInfo.vendorDetails.parentId = commonUtility.getRootScopeProperty(
                constantLoader.rootScopeTypes.ID);
            
            vendorBusiness.registerVendor(vendorInfo).then(function(response){
                if(response.data.success){
                    commonUtility.showAlert(constantLoader.messages.VEND_LOC_CREATE);
                    commonUtility.redirectTo("vendorLocs");
                } else{
                    commonUtility.showAlert(response.data.statusText);
                }
            }, function(error){
                commonUtility.showAlert(error.data.statusText);
            });
        };
        
        vm.onCancelClick = function(){
            commonUtility.redirectTo("vendorLocs");
        };
        
        initialized();
    });

