'use strict';

angular.module('cmaManagementApp').controller('userEPhoneController',
    function(commonUtility, $rootScope, userBusiness, constantLoader){

        var vm = this;
        vm.ePhones = [];
        vm.validPhone = constantLoader.validationPattern.PHONE;
        
        function initialization(){
            loadEPhones();
        }
        
        function loadEPhones(){
            userBusiness.loadUserInfo($rootScope.ID).then(function(response){
                if(response.data.success){
                    if(angular.isDefined(response.data.result.emergencyPhone) &&
                        response.data.result.emergencyPhone !== null){
                        vm.ePhones = response.data.result.emergencyPhone;
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
            vm.ePhones.push(vm.phone);
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
        
        initialization();
    }
);