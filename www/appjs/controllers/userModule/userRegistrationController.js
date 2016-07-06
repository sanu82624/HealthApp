'use strict';

angular.module('cmaManagementApp').controller('userRegistrationController',
    function(constantLoader, userBusiness, commonUtility, generalUtility,
    $rootScope){
		
        var vm = this;

        vm.validName = constantLoader.validationPattern.NAME;
        vm.validEmail = constantLoader.validationPattern.EMAIL;
        vm.validPhone = constantLoader.validationPattern.PHONE;
        vm.emailMsg = constantLoader.messages.VALID_EMAIL;
        vm.nameMsg = constantLoader.messages.VALID_NAME;
        vm.genderMsg = constantLoader.messages.REQ_GENDER;
        vm.pinMsg = constantLoader.messages.REQ_PIN;
        vm.addressMsg = constantLoader.messages.REQ_ADDRESS;
        vm.countryMsg = constantLoader.messages.REQ_COUNTRY;
        vm.countryPhoneCode = constantLoader.defaultValues.BLANK_ISD_CODE;
        
        vm.countryList = [];
        vm.genderList = [
            {
                code: "M",
                name: "Male"
            },
            {
                code: "F",
                name: "Female"
            }
        ];
        
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
                commonUtility.showAlert(error.data);
            });
        }

        vm.onSaveClick = function(frmData){
            if(!frmData.userRegForm.$valid){
                return false;
            }
            var userInfo = {};
            userInfo.name = vm.name;
            userInfo.age = vm.age;
            userInfo.address = vm.address;
            userInfo.pinCode = vm.pinCode;
            userInfo.gender = vm.gender;
            userInfo.phone = [vm.countryPhoneCode + 
                constantLoader.defaultValues.ISD_SEPARATOR + vm.phone];
            userInfo.emailId = [vm.email];
            userInfo.password = vm.pass;
	
            userBusiness.registerUser(userInfo).then(function(response){
                if(response.data.success){
                    commonUtility.showAlert(constantLoader.messages.USER_REG_SUCCESS);
                    $rootScope.IS_SIGN_IN = response.data.success;
                    $rootScope.NAME = response.data.result.name;
                    $rootScope.ID = response.data.result.clientId;
                    $rootScope.EMAIL = userInfo.emailId;
                    commonUtility.redirectTo("userLanding");
                } else{
                    commonUtility.showAlert(response.data.statusText);
                }
            }, function(error){
                commonUtility.showAlert(error.data.statusText);
            });
        };
		
        vm.onCancelClick = function(){
            commonUtility.redirectTo("login");
        };
        
        initialized();
    }
);