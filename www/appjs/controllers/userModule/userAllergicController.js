'use strict';

angular.module('cmaManagementApp').controller('userAllergicController',[
    'commonUtility', '$rootScope', 'userBusiness',
    function(commonUtility, $rootScope, userBusiness){

        var vm = this;
        vm.allergicRecords = [];
        
        function initialization(){
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

        vm.onAddAllergyClick = function(){
            for(var index=0; index<=vm.allergicRecords.length - 1; index++){
                if(vm.allergicRecords[index] === vm.allergy){
                    vm.allergy = "";
                    window.alert("You have already added!");
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