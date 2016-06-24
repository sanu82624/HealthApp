'use strict';

angular.module('cmaManagementApp').controller('userProfileController',[
    'commonUtility',
    function(commonUtility){

        var vm = this;
        vm.medHisRecords = [];

        vm.onCancelClick = function(){
            commonUtility.redirectTo("userLanding");
        };

        vm.onMedHisClick = function(){
            commonUtility.redirectTo("userMH");
        };

        vm.onBackToProfile = function(){
            commonUtility.redirectTo("userProfile");
        };

        vm.onAddMedHisClick = function(){
            for(var index=0; index<=vm.medHisRecords.length - 1; index++){
                if(vm.medHisRecords[index] === vm.medHis){
                    vm.medHis = "";
                    window.alert("You have already added!");
                    return false;
                }
            }
            vm.medHisRecords.push(vm.medHis);
            vm.medHis = "";
        };

        vm.onLoadUserMedicalHistory = function(){
            vm.medHisRecords = [];
        };

        vm.onMedHisDeleteClick = function(record){
            console.info(record);
            for(var index=0; index<=vm.medHisRecords.length - 1; index++){
                if(vm.medHisRecords[index] === record){
                    vm.medHisRecords.splice(index, 1);
                    console.info(vm.medHisRecords);
                    return;
                }
            }
        };
    }
]);