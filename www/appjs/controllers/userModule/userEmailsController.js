'use strict';

angular.module('cmaManagementApp').controller('userEmailsController',[
    'commonUtility', '$rootScope', 'userBusiness', 'validationPattern', 'messages',
    function(commonUtility, $rootScope, userBusiness, validationPattern, messages){

        var vm = this;
        vm.emails = [];
        vm.validEmail = validationPattern.EMAIL;
        
        function initialization(){
            loadEmails();
        }
        
        function loadEmails(){
            userBusiness.loadUserInfo($rootScope.ID).then(function(response){
                if(response.data.success){
                    if(angular.isDefined(response.data.result.emailId) &&
                        response.data.result.emailId !== null){
                        vm.emails = response.data.result.emailId;
                        for(var index=0; index<=vm.emails.length - 1; index++){
                            if(vm.emails[index] === $rootScope.EMAIL){
                                vm.emails.splice(index, 1);
                            }
                        }
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

        vm.onAddEmailClick = function(isNotValidEmail){
            if(isNotValidEmail){
                window.alert(messages.VALID_EMAIL);
                return false;
            }
            for(var index=0; index<=vm.emails.length - 1; index++){
                if(vm.emails[index] === vm.email){
                    vm.email = "";
                    window.alert(messages.ALREADY_ADDED);
                    return false;
                }
            }
            vm.emails.push(vm.email);
            vm.email = "";
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
            userInfo.clientId = $rootScope.ID;
            userInfo.emailId = [];
            userInfo.emailId = userInfo.emailId.concat(vm.emails);
            userInfo.emailId.unshift($rootScope.EMAIL);
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