'use strict';

angular.module('cmaManagementApp').controller('userEPhoneController',
    function(commonUtility, userBusiness, constantLoader, generalUtility){

        var vm = this;
        vm.phones = [];
        vm.countryPhoneCode = constantLoader.defaultValues.BLANK_ISD_CODE;
        vm.countryList = [];
        vm.label = constantLoader.defaultValues.PHONE_TYPE_DEFAULT;
        
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
                commonUtility.showAlert(error.data.statusText);
            });
        }
        
        function loadEPhones(){
            userBusiness.loadUserInfo(commonUtility.getRootScopeProperty(
                constantLoader.rootScopeTypes.ID)).then(function(response){
                if(response.data.success){
                    if(commonUtility.is3DValidKey(commonUtility.getRootScopeProperty(
                        constantLoader.rootScopeTypes.PHONE_TYPE))){
                        if(commonUtility.getRootScopeProperty(
                            constantLoader.rootScopeTypes.PHONE_TYPE) === 
                            constantLoader.defaultValues.PHONE_TYPE_DEFAULT){
                            if(angular.isDefined(response.data.result.phone) &&
                                response.data.result.phone !== null){
                                vm.phones = response.data.result.phone;
                            }
                        }else{
                            if(angular.isDefined(response.data.result.mobile) &&
                                response.data.result.mobile !== null){
                                vm.phones = response.data.result.mobile;
                                vm.label = constantLoader.defaultValues.MOBILE_TYPE_DEFAULT;
                            }
                        }
                        if(vm.phones.length > 0){
                            vm.countryPhoneCode = vm.phones[0].substr(0, 
                                vm.phones[0].indexOf(constantLoader.defaultValues.ISD_SEPARATOR));
                        }
                    }
                }else{
                    commonUtility.showAlert(response.data.statusText);
                    commonUtility.redirectTo(constantLoader.routeTypes.USER_PROFILE);
                }
            }, function(error){
                commonUtility.showAlert(error.data.statusText);
                commonUtility.redirectTo(constantLoader.routeTypes.USER_PROFILE);
            });
        };

        vm.onBackClick = function(){
            commonUtility.redirectTo(constantLoader.routeTypes.USER_PROFILE);
        };

        vm.onAddEPhoneClick = function(isNotValidPhone){
            if(vm.countryPhoneCode === constantLoader.defaultValues.BLANK_ISD_CODE){
                commonUtility.showAlert(constantLoader.messages.COUNTRY_CODE);
                return;
            }
            if(isNotValidPhone || vm.phone === constantLoader.defaultValues.BLANK_STRING || 
                vm.phone === null || angular.isUndefined(vm.phone)){
                commonUtility.showAlert(constantLoader.messages.VALID_PHONE);
                return false;
            }
            for(var index=0; index<=vm.phones.length - 1; index++){
                if(vm.phones[index] === vm.phone){
                    vm.phone = constantLoader.defaultValues.BLANK_STRING;
                    commonUtility.showAlert(constantLoader.messages.ALREADY_ADDED);
                    return false;
                }
            }
            vm.phones.push(vm.countryPhoneCode + 
                constantLoader.defaultValues.ISD_SEPARATOR + vm.phone);
            vm.phone = constantLoader.defaultValues.BLANK_STRING;
        };

        vm.onEPhoneDeleteClick = function(record){
            for(var index=0; index<=vm.phones.length - 1; index++){
                if(vm.phones[index] === record){
                    vm.phones.splice(index, 1);
                    return;
                }
            }
        };
        
        vm.onSaveClick = function(){
            if(commonUtility.is3DValidKey(commonUtility.getRootScopeProperty(
                constantLoader.rootScopeTypes.PHONE_TYPE))){
                var userInfo = {};
                userInfo.clientId = commonUtility.getRootScopeProperty(
                    constantLoader.rootScopeTypes.ID);
                
                if(commonUtility.getRootScopeProperty(
                    constantLoader.rootScopeTypes.PHONE_TYPE) === 
                    constantLoader.defaultValues.PHONE_TYPE_DEFAULT){
                    userInfo.phone = vm.phones;
                }else{
                    userInfo.mobile = vm.phones;
                }
                userBusiness.updateUserInfo(userInfo).then(function(response){
                    if(response.data.success){
                        commonUtility.showAlert(response.data.statusText,
                            constantLoader.alertTypes.SUCCESS);
                        commonUtility.redirectTo(constantLoader.routeTypes.USER_PROFILE);
                    }else{
                        commonUtility.showAlert(response.data.statusText);
                    }
                }, function(error){
                    commonUtility.showAlert(error.data.statusText);
                });
            }
        };
        
        initialized();
    }
);