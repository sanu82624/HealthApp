'use strict';

angular.module('cmaManagementApp').controller('userRegistrationController',[
    'validationPattern', 'messages', 'userBusiness', 'commonUtility',
    '$rootScope',
    function(validationPattern, messages, userBusiness, commonUtility,
    $rootScope){
		
        var vm = this;

        vm.validName = validationPattern.NAME;
        vm.validEmail = validationPattern.EMAIL;
        vm.validPhone = validationPattern.PHONE;
        vm.emailMsg = messages.VALID_EMAIL;
        vm.passMsg = messages.VALID_PASS;
        vm.nameMsg = messages.VALID_NAME;
        vm.genderMsg = messages.REQ_GENDER;
        vm.pinMsg = messages.REQ_PIN;
        vm.phoneMsg = messages.VALID_PHONE;

        vm.onSaveClick = function(frmData){
            if(!frmData.userRegForm.$valid){
                return false;
            }
            var userInfo = {};
            userInfo.name = vm.name;
            userInfo.age = vm.age;
            userInfo.address = vm.address;
            userInfo.pinCode = vm.pinCode;
            userInfo.gender = vm.gender;
            userInfo.phone = [vm.phone];
            userInfo.emailId = [vm.email];
            userInfo.password = vm.pass;
			
            userBusiness.registerUser(userInfo).then(function(response){
                if(response.data.success){
                    window.alert(messages.USER_REG_SUCCESS);
                    console.info(response);
                    $rootScope.IS_SIGN_IN = response.data.success;
                    $rootScope.NAME = response.data.result.name;
                    $rootScope.ID = response.data.result.clientId;
                    $rootScope.EMAIL = userInfo.emailId;
                    commonUtility.redirectTo("userLanding");
                } else{
                    window.alert(messages.USER_REG_FAIL);
                }
            }, function(error){
                window.alert(messages.USER_REG_FAIL);
            });
        };
		
        vm.onCancelClick = function(){
            commonUtility.redirectTo("login");
        };
    }
]);