'use strict';

angular.module('cmaManagementApp').controller('userAllergicController',
    function(commonUtility, $rootScope, userBusiness, constantLoader){

        var vm = this;
        vm.allergicRecords = [];
        
        function initialized(){
            loadAllergic();
        }
        
        function loadAllergic(){
            userBusiness.loadUserInfo($rootScope.ID).then(function(response){
                if(response.data.success){
                    if(angular.isDefined(response.data.result.alergicTo) &&
                        response.data.result.alergicTo !== null){
                        vm.allergicRecords = response.data.result.alergicTo;
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

        vm.onAddAllergyClick = function(){
            if(vm.allergy === "" || 
                vm.allergy === null || angular.isUndefined(vm.allergy)){
                commonUtility.showAlert(constantLoader.messages.BLANK_VALUE);
                return false;
            }
            for(var index=0; index<=vm.allergicRecords.length - 1; index++){
                if(vm.allergicRecords[index] === vm.allergy){
                    vm.allergy = "";
                    commonUtility.showAlert(constantLoader.messages.ALREADY_ADDED);
                    return false;
                }
            }
            vm.allergicRecords.push(vm.allergy);
            vm.allergy = "";
        };

        vm.onAllergicDeleteClick = function(record){
            for(var index=0; index<=vm.allergicRecords.length - 1; index++){
                if(vm.allergicRecords[index] === record){
                    vm.allergicRecords.splice(index, 1);
                    return;
                }
            }
        };
        
        vm.onSaveClick = function(){
            var userInfo = {};
            userInfo.clientId = $rootScope.ID;
            userInfo.alergicTo = vm.allergicRecords;
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