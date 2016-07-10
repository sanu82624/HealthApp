'use strict';

angular.module('cmaManagementApp').controller('userHomeController',
    function(commonUtility, constantLoader){

        var vm = this;

        vm.onNewRequestClick = function(){
            commonUtility.redirectTo("newReq");
        };

        vm.onMyRequestClick = function(){
            commonUtility.redirectTo("myReq");
        };

        vm.onProfileClick = function(){
            commonUtility.redirectTo("userProfile");
        };

        vm.onLogoutClick = function(){
            commonUtility.setRootScopeProperty(
                constantLoader.rootScopeTypes.IS_SIGN_IN, false);
            commonUtility.setRootScopeProperty(
                constantLoader.rootScopeTypes.NAME, constantLoader.defaultValues.BLANK_STRING);
            commonUtility.setRootScopeProperty(
                constantLoader.rootScopeTypes.ID, constantLoader.defaultValues.BLANK_STRING);
            commonUtility.setRootScopeProperty(
                constantLoader.rootScopeTypes.EMAIL, constantLoader.defaultValues.BLANK_STRING);
        
            commonUtility.redirectTo("appHome");
        };
    }
);