'use strict';

angular.module('cmaManagementApp').controller('userRegistrationController',
    function(constantLoader, userBusiness, commonUtility, generalUtility){
		
        var vm = this;

        vm.countryPhoneCode = constantLoader.defaultValues.BLANK_ISD_CODE;
        vm.countryList = [];
        vm.genderList = commonUtility.getJsonFromString(constantLoader.defaultValues.GENDER);
        
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
            userInfo.country = vm.country;
            userInfo.state = vm.state;
            userInfo.city = vm.city;
	
            userBusiness.registerUser(userInfo).then(function(response){
                if(response.data.success){
                    commonUtility.setRootScopeProperty(
                        constantLoader.rootScopeTypes.IS_SIGN_IN, response.data.success);
                    commonUtility.setRootScopeProperty(
                        constantLoader.rootScopeTypes.NAME, response.data.result.name);
                    commonUtility.setRootScopeProperty(
                        constantLoader.rootScopeTypes.ID, response.data.result.clientId);
                    commonUtility.setRootScopeProperty(
                        constantLoader.rootScopeTypes.EMAIL, vm.email);
                    commonUtility.setRootScopeProperty(
                        constantLoader.rootScopeTypes.USER_TYPE, constantLoader.userTypes.CLIENT);
                    commonUtility.setRootScopeProperty(
                        constantLoader.rootScopeTypes.IS_USER_TYPE_SHOW, false);
                
                    commonUtility.showAlert(constantLoader.messages.USER_REG_SUCCESS,
                        constantLoader.alertTypes.SUCCESS);
                    commonUtility.redirectTo(constantLoader.routeTypes.USER_LANDING);
                } else{
                    commonUtility.showAlert(response.data.statusText);
                }
            }, function(error){
                commonUtility.showAlert(error.data.statusText);
            });
        };
		
        vm.onCancelClick = function(){
            commonUtility.redirectTo(constantLoader.routeTypes.USER_LOGIN);
        };
        
        initialized();
    }
);