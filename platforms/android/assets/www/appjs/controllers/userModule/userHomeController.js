'use strict';

angular.module('cmaManagementApp').controller('userHomeController',[
    'commonUtility', '$rootScope',
    function(commonUtility, $rootScope){

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
            $rootScope.ID = "";
            $rootScope.IS_SIGN_IN = false;
            $rootScope.NAME = "";
            $rootScope.EMAIL = "";
            commonUtility.redirectTo("appHome");
        };
    }
]);