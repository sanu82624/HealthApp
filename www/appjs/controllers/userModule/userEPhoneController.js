'use strict';

angular.module('cmaManagementApp').controller('userEPhoneController',
    function(commonUtility, $rootScope, userBusiness, constantLoader,
    generalUtility){

        var vm = this;
        vm.ePhones = [];
        vm.countryPhoneCode = constantLoader.defaultValues.BLANK_ISD_CODE;
        vm.countryList = [];
        
        function initialized(){
            loadCountries();
            loadEPhones();
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
        
        function loadEPhones(){
            userBusiness.loadUserInfo($rootScope.ID).then(function(response){
                if(response.data.success){
                    if(angular.isDefined(response.data.result.emergencyPhone) &&
                        response.data.result.emergencyPhone !== null){
                        vm.ePhones = response.data.result.emergencyPhone;
                        if(vm.ePhones.length > 0){
                            vm.countryPhoneCode = vm.ePhones[0].substr(0, 
                                vm.ePhones[0].indexOf(constantLoader.defaultValues.ISD_SEPARATOR));
                        }
                    }
                }else{
                    commonUtility.showAlert(response.data.statusText);
                    commonUtility.redirectTo("userProfile");
                }
            }, function(error){
                commonUtility.showAlert(error.data);
                commonUtility.redirectTo("userProfile");
            });
        };

        vm.onBackClick = function(){
            commonUtility.redirectTo("userProfile");
        };

        vm.onAddEPhoneClick = function(isNotValidPhone){
            if(vm.countryPhoneCode === constantLoader.defaultValues.BLANK_ISD_CODE){
                commonUtility.showAlert(constantLoader.messages.COUNTRY_CODE);
                return;
            }
            if(isNotValidPhone || vm.phone === "" || 
                vm.phone === null || angular.isUndefined(vm.phone)){
                commonUtility.showAlert(constantLoader.messages.VALID_PHONE);
                return false;
            }
            for(var index=0; index<=vm.ePhones.length - 1; index++){
                if(vm.ePhones[index] === vm.phone){
                    vm.phone = "";
                    commonUtility.showAlert(constantLoader.messages.ALREADY_ADDED);
                    return false;
                }
            }
            vm.ePhones.push(vm.countryPhoneCode + 
                constantLoader.defaultValues.ISD_SEPARATOR + vm.phone);
            vm.phone = "";
        };

        vm.onEPhoneDeleteClick = function(record){
            for(var index=0; index<=vm.ePhones.length - 1; index++){
                if(vm.ePhones[index] === record){
                    vm.ePhones.splice(index, 1);
                    return;
                }
            }
        };
        
        vm.onSaveClick = function(){
            var userInfo = {};
            userInfo.clientId = $rootScope.ID;
            userInfo.emergencyPhone = vm.ePhones;
            userBusiness.updateUserInfo(userInfo).then(function(response){
                commonUtility.showAlert(response.data.statusText);
                if(response.data.success){
                    commonUtility.redirectTo("userProfile");
                }
            }, function(error){
                commonUtility.showAlert(error.data);
            });
        };
        
        initialized();
    }
);