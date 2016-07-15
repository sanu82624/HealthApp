'use strict';

angular.module('cmaManagementApp').controller('userProfileController',
    function(commonUtility, constantLoader){

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
        
        vm.onPhoneClick = function(){
            commonUtility.setRootScopeProperty(
                constantLoader.rootScopeTypes.PHONE_TYPE,
                constantLoader.defaultValues.PHONE_TYPE_DEFAULT);
            commonUtility.redirectTo("userEPhone");
        };
        
        vm.onMobileClick = function(){
            commonUtility.setRootScopeProperty(
                constantLoader.rootScopeTypes.PHONE_TYPE,
                constantLoader.defaultValues.MOBILE_TYPE_DEFAULT);
            commonUtility.redirectTo("userEPhone");
        };

        vm.onPasswordClick = function(){
            commonUtility.redirectTo("userPass");
        };
        
        vm.onEditInfoClick = function(){
            commonUtility.redirectTo("userInfo");
        };
    }
);