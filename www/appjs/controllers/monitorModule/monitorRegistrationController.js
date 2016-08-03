'use strict';

angular.module('cmaManagementApp').controller('monitorRegistrationController',
    function(constantLoader, monitorBusiness, commonUtility, generalUtility){
		
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
            if(!frmData.monitorRegForm.$valid){
                return false;
            }
            var monitorInfo = {};
            monitorInfo.login = vm.email;
            monitorInfo.password = vm.pass;
            monitorInfo.details = {};
            monitorInfo.details.name = vm.name;
            monitorInfo.details.address = vm.address;
            monitorInfo.details.pin = vm.pinCode;
            monitorInfo.details.country = vm.country;
            monitorInfo.details.state = vm.state;
            monitorInfo.details.city = vm.city;
            monitorInfo.details.contacts = [vm.countryPhoneCode + 
                constantLoader.defaultValues.ISD_SEPARATOR + vm.phone];
            monitorInfo.details.active = true;
			
            monitorBusiness.createNewMonitor(monitorInfo).then(function(response){
                if(response.data.success){
                    commonUtility.setRootScopeProperty(
                        constantLoader.rootScopeTypes.IS_SIGN_IN, response.data.success);
                    commonUtility.setRootScopeProperty(
                        constantLoader.rootScopeTypes.NAME, response.data.result.name);
                    commonUtility.setRootScopeProperty(
                        constantLoader.rootScopeTypes.ID, response.data.result.mgpersonId);
                    commonUtility.setRootScopeProperty(
                        constantLoader.rootScopeTypes.USER_TYPE, constantLoader.userTypes.MONITOR);
                
                    commonUtility.showAlert(constantLoader.messages.USER_REG_SUCCESS,
                        constantLoader.alertTypes.SUCCESS);
                    commonUtility.redirectTo(constantLoader.routeTypes.MONITOR_HOME);
                } else{
                    commonUtility.showAlert(constantLoader.messages.USER_REG_FAIL);
                }
            }, function(error){
                commonUtility.showAlert(error.data.statusText);
            });
        };
		
        vm.onCancelClick = function(){
            commonUtility.redirectTo(constantLoader.routeTypes.MONITOR_LOGIN);
        };
        
        initialized();
    }
);