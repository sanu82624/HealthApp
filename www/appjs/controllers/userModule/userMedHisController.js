'use strict';

angular.module('cmaManagementApp').controller('userMedHisController',
    function(commonUtility, $rootScope, userBusiness, constantLoader){

        var vm = this;
        vm.medHisRecords = [];
        
        function initialization(){
            loadMedicalHistory();
        }
        
        function loadMedicalHistory(){
            userBusiness.loadUserInfo($rootScope.ID).then(function(response){
                if(response.data.success){
                    if(angular.isDefined(response.data.result.medicalHistory) &&
                        response.data.result.medicalHistory !== null){
                        vm.medHisRecords = response.data.result.medicalHistory;
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

        vm.onAddMedHisClick = function(){
            if(vm.medHis === "" || 
                vm.medHis === null || angular.isUndefined(vm.medHis)){
                commonUtility.showAlert(constantLoader.messages.BLANK_VALUE);
                return false;
            }
            for(var index=0; index<=vm.medHisRecords.length - 1; index++){
                if(vm.medHisRecords[index] === vm.medHis){
                    vm.medHis = "";
                    commonUtility.showAlert(constantLoader.messages.ALREADY_ADDED);
                    return false;
                }
            }
            vm.medHisRecords.push(vm.medHis);
            vm.medHis = "";
        };

        vm.onMedHisDeleteClick = function(record){
            for(var index=0; index<=vm.medHisRecords.length - 1; index++){
                if(vm.medHisRecords[index] === record){
                    vm.medHisRecords.splice(index, 1);
                    return;
                }
            }
        };
        
        vm.onSaveClick = function(){
            var userInfo = {};
            userInfo.clientId = $rootScope.ID;
            userInfo.medicalHistory = vm.medHisRecords;
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