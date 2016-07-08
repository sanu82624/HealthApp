'use strict';

angular.module('cmaManagementApp').controller('vendorRegistrationController',
    function(constantLoader, vendorBusiness, commonUtility, generalUtility){
		
        var vm = this;

        vm.countryPhoneCode = constantLoader.defaultValues.BLANK_ISD_CODE;
        vm.serviceTypes = [];
        vm.countryList = [];
        
        function initialized(){
            loadServiceTypes();
            loadCountries();
        }
        
        function loadServiceTypes(){
            generalUtility.loadServiceType().then(function(response){
                if(response.data.success){
                    if(response.data.result !== null){
                        angular.forEach(response.data.result, function(value, key) {
                            vm.serviceTypes.push({
                                code: key,
                                name: value
                            });
                        });
                    }
                } else{
                    commonUtility.showAlert(response.data.statusText);
                }
            }, function(error){
                commonUtility.showAlert(error.data);
            });
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
        	
        vm.onSaveClick = function(frmData){
            if(!frmData.vendorRegForm.$valid){
                return false;
            }
            var vendorInfo = {};
            vendorInfo.login = vm.email;
            vendorInfo.password = vm.pass;
            vendorInfo.vendorDetails = {};
            vendorInfo.vendorDetails.name = vm.name;
            vendorInfo.vendorDetails.vendType = vm.type;
            vendorInfo.vendorDetails.address = vm.address;
            vendorInfo.vendorDetails.description = vm.desc;
            vendorInfo.vendorDetails.pin = vm.pinCode;
            vendorInfo.vendorDetails.country = vm.country;
            vendorInfo.vendorDetails.state = vm.state;
            vendorInfo.vendorDetails.city = vm.city;
            vendorInfo.vendorDetails.contacts = [vm.countryPhoneCode + 
                constantLoader.defaultValues.ISD_SEPARATOR + vm.phone];
            vendorInfo.vendorDetails.active = true;
			
            vendorBusiness.registerVendor(vendorInfo).then(function(response){
                if(response.data.success){
                    commonUtility.setRootScopeProperty(
                        constantLoader.rootScopeTypes.IS_SIGN_IN, response.data.success);
                    commonUtility.setRootScopeProperty(
                        constantLoader.rootScopeTypes.NAME, response.data.result.name);
                    commonUtility.setRootScopeProperty(
                        constantLoader.rootScopeTypes.ID, response.data.result.vendId);
                    commonUtility.setRootScopeProperty(
                        constantLoader.rootScopeTypes.VEND_TYPE, response.data.result.vendType);
                    commonUtility.setRootScopeProperty(
                        constantLoader.rootScopeTypes.EMAIL, vm.email);
                
                    commonUtility.showAlert(constantLoader.messages.USER_REG_SUCCESS);
                    commonUtility.redirectTo("groundVendorHome");
                } else{
                    commonUtility.showAlert(constantLoader.messages.USER_REG_FAIL);
                }
            }, function(error){
                commonUtility.showAlert(constantLoader.messages.USER_REG_FAIL);
            });
        };
		
        vm.onCancelClick = function(){
            commonUtility.redirectTo("vendorLogin");
        };
        
        initialized();
    }
);