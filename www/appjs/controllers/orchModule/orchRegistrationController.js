'use strict';

angular.module('cmaManagementApp').controller('orchRegistrationController',
    function(constantLoader, orchBusiness, commonUtility, generalUtility){
		
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
            if(!frmData.orchRegForm.$valid){
                return false;
            }
            var orchInfo = {};
            orchInfo.name = vm.name;
            orchInfo.age = vm.age;
            orchInfo.address = vm.address;
            orchInfo.pinCode = vm.pinCode;
            orchInfo.gender = vm.gender;
            orchInfo.phone = [vm.countryPhoneCode + 
                constantLoader.defaultValues.ISD_SEPARATOR + vm.phone];
            orchInfo.emailId = [vm.email];
            orchInfo.password = vm.pass;
            orchInfo.country = vm.country;
            orchInfo.state = vm.state;
            orchInfo.city = vm.city;
	
            orchBusiness.registerOrch(orchInfo).then(function(response){
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
                        constantLoader.rootScopeTypes.USER_TYPE, constantLoader.userTypes.ORCH);
                    commonUtility.setRootScopeProperty(
                        constantLoader.rootScopeTypes.IS_USER_TYPE_SHOW, false);
                
                    commonUtility.showAlert(constantLoader.messages.USER_REG_SUCCESS,
                        constantLoader.alertTypes.SUCCESS);
                    commonUtility.redirectTo(constantLoader.routeTypes.USER_LAND);
                } else{
                    commonUtility.showAlert(response.data.statusText);
                }
            }, function(error){
                commonUtility.showAlert(error.data.statusText);
            });
        };
		
        vm.onCancelClick = function(){
            commonUtility.redirectTo(constantLoader.routeTypes.ORCH_LOGIN);
        };
        
        initialized();
    }
);