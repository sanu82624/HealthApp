'use strict';

angular.module('cmaManagementApp').controller('userProfileController',[
    'commonUtility',
    function(commonUtility){

        var vm = this;

        vm.onCancelClick = function(){
            commonUtility.redirectTo("userLanding");
        };

        vm.onMedHisClick = function(){
            commonUtility.redirectTo("userMH");
        };
        
        vm.onAllergicClick = function(){
            commonUtility.redirectTo("userAllergic");
        };
        
        vm.onEmailsClick = function(){
            commonUtility.redirectTo("userEmail");
        };
        
        vm.onEPhoneClick = function(){
            commonUtility.redirectTo("userEPhone");
        };

        vm.onPasswordClick = function(){
            commonUtility.redirectTo("userPass");
        };
        
        vm.onEditInfoClick = function(){
            commonUtility.redirectTo("userInfo");
        };
    }
]);