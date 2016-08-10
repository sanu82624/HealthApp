'use strict';

angular.module('cmaManagementApp').controller('userProfileController',
    function(commonUtility, constantLoader){

        var vm = this;

        vm.onCancelClick = function(){
            commonUtility.redirectTo(constantLoader.routeTypes.USER_LAND);
        };

        vm.onMedHisClick = function(){
            commonUtility.redirectTo(constantLoader.routeTypes.USER_MH);
        };
        
        vm.onAllergicClick = function(){
            commonUtility.redirectTo(constantLoader.routeTypes.USER_ALLERGY);
        };
        
        vm.onEmailsClick = function(){
            commonUtility.redirectTo(constantLoader.routeTypes.USER_EMAIL);
        };
        
        vm.onPhoneClick = function(){
            commonUtility.setRootScopeProperty(
                constantLoader.rootScopeTypes.PHONE_TYPE,
                constantLoader.defaultValues.PHONE_TYPE_DEFAULT);
            commonUtility.redirectTo(constantLoader.routeTypes.USER_PHONE);
        };
        
        vm.onMobileClick = function(){
            commonUtility.setRootScopeProperty(
                constantLoader.rootScopeTypes.PHONE_TYPE,
                constantLoader.defaultValues.MOBILE_TYPE_DEFAULT);
            commonUtility.redirectTo(constantLoader.routeTypes.USER_PHONE);
        };

        vm.onPasswordClick = function(){
            commonUtility.redirectTo(constantLoader.routeTypes.USER_PASS);
        };
        
        vm.onEditInfoClick = function(){
            commonUtility.redirectTo(constantLoader.routeTypes.USER_INFO);
        };
    }
);