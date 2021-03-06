'use strict';

angular.module('cmaManagementApp').controller('userInfoController',
    function(constantLoader, userBusiness, commonUtility, generalUtility){
		
        var vm = this;

        vm.userInfo = {};
        vm.countryList = [];
        vm.genderList = commonUtility.getJsonFromString(constantLoader.defaultValues.GENDER);
        
        function initialized(){
            loadCountries();
            loadUserInfo();
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
        
        function loadUserInfo(){
            userBusiness.loadUserInfo(commonUtility.getRootScopeProperty(
                constantLoader.rootScopeTypes.ID)).then(function(response){
                if(response.data.success){
                    vm.userInfo = response.data.result;
                    if(vm.userInfo !== null){
                        if(angular.isDefined(vm.userInfo.age)){
                            vm.userInfo.age = parseInt(vm.userInfo.age);
                        }
                    }
                }else{
                    commonUtility.showAlert(response.data.statusText);
                    commonUtility.redirectTo(constantLoader.routeTypes.USER_PROFILE);
                }
            }, function(error){
                commonUtility.redirectTo(constantLoader.routeTypes.USER_PROFILE);
            });
        }

        vm.onSaveClick = function(frmData){
            if(!frmData.userInfoForm.$valid){
                return false;
            }
            
            var user = {};
            user.clientId = vm.userInfo.clientId;
            user.name = vm.userInfo.name;
            user.age = vm.userInfo.age;
            user.address = vm.userInfo.address;
            user.pinCode = vm.userInfo.pinCode;
            user.gender = vm.userInfo.gender;
            user.country = vm.userInfo.country;
            user.state = vm.userInfo.state;
            user.city = vm.userInfo.city;
            userBusiness.updateUserInfo(user).then(function(response){
                if(response.data.success){
                    commonUtility.showAlert(response.data.statusText,
                        constantLoader.alertTypes.SUCCESS);
                    commonUtility.setRootScopeProperty(
                        constantLoader.rootScopeTypes.NAME, user.name);
                    commonUtility.redirectTo(constantLoader.routeTypes.USER_PROFILE);
                }else{
                    commonUtility.showAlert(response.data.statusText);
                }
            }, function(error){
                commonUtility.redirectTo(constantLoader.routeTypes.USER_PROFILE);
            });
        };
		
        vm.onBackClick = function(){
            commonUtility.redirectTo(constantLoader.routeTypes.USER_PROFILE);
        };
        
        initialized();
    }
);