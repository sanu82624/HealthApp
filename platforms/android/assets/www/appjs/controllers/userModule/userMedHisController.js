'use strict';

angular.module('cmaManagementApp').controller('userMedHisController',
    function(commonUtility, userBusiness, constantLoader){

        var vm = this;
        vm.medHisRecords = [];
        
        function initialized(){
            loadMedicalHistory();
        }
        
        function loadMedicalHistory(){
            userBusiness.loadUserInfo(commonUtility.getRootScopeProperty(
                constantLoader.rootScopeTypes.ID)).then(function(response){
                if(response.data.success){
                    if(angular.isDefined(response.data.result.medicalHistory) &&
                        response.data.result.medicalHistory !== null){
                        vm.medHisRecords = response.data.result.medicalHistory;
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

        vm.onAddMedHisClick = function(){
            if(!commonUtility.is3DValidKey(vm.medHis)){
                commonUtility.showAlert(constantLoader.messages.BLANK_VALUE);
                return false;
            }
            for(var index=0; index<=vm.medHisRecords.length - 1; index++){
                if(vm.medHisRecords[index] === vm.medHis){
                    vm.medHis = constantLoader.defaultValues.BLANK_STRING;
                    commonUtility.showAlert(constantLoader.messages.ALREADY_ADDED);
                    return false;
                }
            }
            vm.medHisRecords.push(vm.medHis);
            vm.medHis = constantLoader.defaultValues.BLANK_STRING;
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
            userInfo.clientId = commonUtility.getRootScopeProperty(
                constantLoader.rootScopeTypes.ID);
            userInfo.medicalHistory = vm.medHisRecords;
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
        };
        
        initialized();
    }
);