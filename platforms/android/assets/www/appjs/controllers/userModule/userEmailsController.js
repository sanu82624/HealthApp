'use strict';

angular.module('cmaManagementApp').controller('userEmailsController',
    function(commonUtility, userBusiness, constantLoader){

        var vm = this;
        vm.emails = [];
        vm.validEmail = constantLoader.validationPattern.EMAIL;
        
        function initialized(){
            loadEmails();
        }
        
        function loadEmails(){
            userBusiness.loadUserInfo(commonUtility.getRootScopeProperty(
                constantLoader.rootScopeTypes.ID)).then(function(response){
                if(response.data.success){
                    if(angular.isDefined(response.data.result.emailId) &&
                        response.data.result.emailId !== null){
                        vm.emails = response.data.result.emailId;
                        for(var index=0; index<=vm.emails.length - 1; index++){
                            if(vm.emails[index] === commonUtility.getRootScopeProperty(
                                constantLoader.rootScopeTypes.EMAIL)){
                                vm.emails.splice(index, 1);
                            }
                        }
                    }
                }else{
                    commonUtility.showAlert(response.data.statusText);
                    commonUtility.redirectTo("userProfile");
                }
            }, function(error){
                commonUtility.showAlert(error.data.statusText);
                commonUtility.redirectTo("userProfile");
            });
        };

        vm.onBackClick = function(){
            commonUtility.redirectTo("userProfile");
        };

        vm.onAddEmailClick = function(isNotValidEmail){
            if(isNotValidEmail || vm.email === constantLoader.defaultValues.BLANK_STRING || 
                vm.email === null || angular.isUndefined(vm.email)){
                commonUtility.showAlert(constantLoader.messages.VALID_EMAIL);
                return false;
            }
            for(var index=0; index<=vm.emails.length - 1; index++){
                if(vm.emails[index] === vm.email){
                    vm.email = constantLoader.defaultValues.BLANK_STRING;
                    commonUtility.showAlert(constantLoader.messages.ALREADY_ADDED);
                    return false;
                }
            }
            vm.emails.push(vm.email);
            vm.email = constantLoader.defaultValues.BLANK_STRING;
        };

        vm.onEmailDeleteClick = function(record){
            for(var index=0; index<=vm.emails.length - 1; index++){
                if(vm.emails[index] === record){
                    vm.emails.splice(index, 1);
                    return;
                }
            }
        };
        
        vm.onSaveClick = function(){
            var userInfo = {};
            userInfo.clientId = commonUtility.getRootScopeProperty(
                constantLoader.rootScopeTypes.ID);;
            userInfo.emailId = [];
            userInfo.emailId = userInfo.emailId.concat(vm.emails);
            userInfo.emailId.unshift(commonUtility.getRootScopeProperty(
                constantLoader.rootScopeTypes.EMAIL));
            userBusiness.updateUserInfo(userInfo).then(function(response){
                commonUtility.showAlert(response.data.statusText);
                if(response.data.success){
                    commonUtility.redirectTo("userProfile");
                }
            }, function(error){
                commonUtility.showAlert(error.data.statusText);
            });
        };
        
        initialized();
    }
);