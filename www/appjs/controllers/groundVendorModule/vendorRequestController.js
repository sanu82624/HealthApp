'use strict';

angular.module('cmaManagementApp').controller('vendorRequestController',[
    'commonUtility', 'vendorBusiness', '$rootScope',
    function(commonUtility, vendorBusiness, $rootScope){
		
        var vm = this;

        vm.requests = [];

        function initialized(){
            loadAssignedRequests();
        }

        function loadAssignedRequests(){
            vendorBusiness.getAssignedRequests($rootScope.ID).then(function(response){
                vm.requests = response.data.result;
                console.info(vm.requests);
            }, function(error){

            });
        }

        vm.onBacktoVendorHome = function(){
            commonUtility.redirectTo("groundVendorHome");
        };

        vm.onCurrentReqClick = function(){
            commonUtility.redirectTo("vendorAllReq");
        };
		
        vm.onLogoutClick = function(){
            $rootScope.IS_SIGN_IN = false;
            $rootScope.NAME = "";
            $rootScope.ID = "";
            $rootScope.vendorType = "";
            commonUtility.redirectTo("appHome");
        };

        vm.onProfileClick = function(){
            commonUtility.redirectTo("vendorProfile");
        };

        initialized();
    }
]);