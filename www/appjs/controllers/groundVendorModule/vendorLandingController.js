'use strict';

angular.module('cmaManagementApp').controller('vendorLandingController',
    function(commonUtility, vendorBusiness, $rootScope, serviceLoader,
        constantLoader){
		
        var vm = this;

        vm.assignedRequestCount = 0;
        vm.respondedRequestCount = 0;

        function initialized(){
            loadRequests();
        }

        function loadRequests(){
            vendorBusiness.getAssignedRequests($rootScope.ID).then(function(response){
                vm.assignedRequestCount = (serviceLoader.filter('filter')(response.data.result, 
                    {status: constantLoader.ticketStatusTypes.ASSIGNED})).length;
                vm.respondedRequestCount = (serviceLoader.filter('filter')(response.data.result, 
                    {status: "!" + constantLoader.ticketStatusTypes.ASSIGNED})).length;
            }, function(error){
                console.log(error.data);
            });
        }

        vm.onBacktoVendorHome = function(){
            commonUtility.redirectTo("groundVendorHome");
        };

        vm.onAssignedReqClick = function(){
            commonUtility.redirectTo("vendorRaisedReq");
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
);