'use strict';

angular.module('cmaManagementApp').controller('userMedHisController',[
    'commonUtility', '$rootScope', 'userBusiness',
    function(commonUtility, $rootScope, userBusiness){

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
                    window.alert(response.data.statusText);
                    commonUtility.redirectTo("userProfile");
                }
            }, function(error){
                window.alert(error.data);
                commonUtility.redirectTo("userProfile");
            });
        };

        vm.onBackClick = function(){
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
                window.alert(response.data.statusText);
                if(response.data.success){
                    commonUtility.redirectTo("userProfile");
                }
            }, function(error){
                window.alert(error.data);
            });
        };
        
        initialization();
    }
]);