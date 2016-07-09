'use strict';

angular.module('cmaManagementApp').controller('vendorLandingController',
    function(commonUtility, vendorBusiness, serviceLoader, constantLoader){
		
        var vm = this;

        vm.assignedRequestCount = 0;
        vm.respondedRequestCount = 0;

        function initialized(){
            loadRequests();
        }

        function loadRequests(){
            vendorBusiness.getAssignedRequests(commonUtility.getRootScopeProperty(
                constantLoader.rootScopeTypes.ID)).then(function(response){
                vm.assignedRequestCount = (serviceLoader.filter('filter')(response.data.result, 
                    {status: constantLoader.ticketStatusTypes.ASSIGNED})).length;
                vm.respondedRequestCount = (serviceLoader.filter('filter')(response.data.result, 
                    {status: "!" + constantLoader.ticketStatusTypes.ASSIGNED})).length;
            }, function(error){
                console.log(error.data.statusText);
            });
        }

        vm.onBacktoVendorHome = function(){
            commonUtility.redirectTo("groundVendorHome");
        };

        vm.onAssignedReqClick = function(){
            commonUtility.redirectTo("vendorRaisedReq");
        };
        
        vm.onRespondedReqClick = function(){
            commonUtility.redirectTo("vendorRespondedReq");
        };
		
        vm.onLogoutClick = function(){
            commonUtility.setRootScopeProperty(
                constantLoader.rootScopeTypes.IS_SIGN_IN, false);
            commonUtility.setRootScopeProperty(
                constantLoader.rootScopeTypes.NAME, constantLoader.defaultValues.BLANK_STRING);
            commonUtility.setRootScopeProperty(
                constantLoader.rootScopeTypes.ID, constantLoader.defaultValues.BLANK_STRING);
            commonUtility.setRootScopeProperty(
                constantLoader.rootScopeTypes.VEND_TYPE, constantLoader.defaultValues.BLANK_STRING);
            commonUtility.setRootScopeProperty(
                constantLoader.rootScopeTypes.EMAIL, constantLoader.defaultValues.BLANK_STRING);

            commonUtility.redirectTo("appHome");
        };

        vm.onProfileClick = function(){
            commonUtility.redirectTo("vendorProfile");
        };

        initialized();
    }
);