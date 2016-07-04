'use strict';

angular.module('cmaManagementApp').controller('vendorRegistrationController',
    function(constantLoader, vendorBusiness, commonUtility,
    $rootScope, generalUtility){
		
        var vm = this;

        vm.validName = constantLoader.validationPattern.NAME;
        vm.validEmail = constantLoader.validationPattern.EMAIL;
        vm.validPhone = constantLoader.validationPattern.PHONE;
        vm.emailMsg = constantLoader.messages.VALID_EMAIL;
        vm.nameMsg = constantLoader.messages.VALID_NAME;
        vm.pinMsg = constantLoader.messages.REQ_PIN;
        vm.serviceTypeMsg = constantLoader.messages.REQ_SERVICE_TYPE;
        vm.addressMsg = constantLoader.messages.REQ_ADDRESS;
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
                    vm.countryList = response.data.result;
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
            vendorInfo.vendorDetails.contacts = [vm.countryPhoneCode + 
                constantLoader.defaultValues.ISD_SEPARATOR + vm.phone];
            vendorInfo.vendorDetails.active = true;
			
            vendorBusiness.registerVendor(vendorInfo).then(function(response){
                if(response.data.success){
                    commonUtility.showAlert(constantLoader.messages.USER_REG_SUCCESS);
                    $rootScope.IS_SIGN_IN = response.data.success;
                    $rootScope.NAME = response.data.result.name;
                    $rootScope.ID = response.data.result.vendId;
                    $rootScope.vendorType = response.data.result.vendType;
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