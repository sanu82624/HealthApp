'use strict';

angular.module('cmaManagementApp').controller('userInfoController',[
    'validationPattern', 'messages', 'userBusiness', 'commonUtility',
    '$rootScope',
    function(validationPattern, messages, userBusiness, commonUtility,
    $rootScope){
		
        var vm = this;

        vm.validName = validationPattern.NAME;
        vm.nameMsg = messages.VALID_NAME;
        vm.genderMsg = messages.REQ_GENDER;
        vm.pinMsg = messages.REQ_PIN;
        vm.userInfo = {};
        
        function initialized(){
            loadUserInfo();
        }
        
        function loadUserInfo(){
            userBusiness.loadUserInfo($rootScope.ID).then(function(response){
                if(response.data.success){
                    vm.userInfo = response.data.result;
                    if(vm.userInfo !== null){
                        if(angular.isDefined(vm.userInfo.age)){
                            vm.userInfo.age = parseInt(vm.userInfo.age);
                        }
                    }
                    console.log(vm.userInfo);
                }else{
                    commonUtility.showAlert(response.data.statusText);
                    commonUtility.redirectTo("userProfile");
                }
            }, function(error){
                commonUtility.redirectTo("userProfile");
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
            userBusiness.updateUserInfo(user).then(function(response){
                commonUtility.showAlert(response.data.statusText);
                if(response.data.success){
                    $rootScope.NAME = user.name;
                    commonUtility.redirectTo("userProfile");
                }
            }, function(error){
                commonUtility.redirectTo("userProfile");
            });
        };
		
        vm.onBackClick = function(){
            commonUtility.redirectTo("userProfile");
        };
        
        initialized();
    }
]);