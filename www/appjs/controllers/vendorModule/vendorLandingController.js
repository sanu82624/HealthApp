'use strict';

angular.module('cmaManagementApp').controller('vendorLandingController',
    function(commonUtility, vendorBusiness, serviceLoader, constantLoader){
		
        var vm = this;

        vm.assignedRequestCount = 0;
        vm.acceptedRequestCount = 0;
        vm.declinedRequestCount = 0;
        vm.closedRequestCount = 0;

        function initialized(){
            loadRequests();
        }

        function loadRequests(){
            vendorBusiness.getAssignedRequests(commonUtility.getRootScopeProperty(
                constantLoader.rootScopeTypes.ID)).then(function(response){
                if(response.data.success){
                    vm.assignedRequestCount = (serviceLoader.filter('filter')(response.data.result, 
                        {status: constantLoader.ticketStatusTypes.ASSIGNED})).length;
                    vm.acceptedRequestCount = (serviceLoader.filter('filter')(response.data.result, 
                        {status: constantLoader.ticketStatusTypes.ACCEPTED})).length;
                    vm.declinedRequestCount = (serviceLoader.filter('filter')(response.data.result, 
                        {status: constantLoader.ticketStatusTypes.DECLINED})).length;
                    vm.closedRequestCount = (serviceLoader.filter('filter')(response.data.result, 
                        {status: constantLoader.ticketStatusTypes.CLOSED})).length;
                }else{
                    commonUtility.showAlert(response.data.statusText);
                }
            }, function(error){
                commonUtility.showAlert(error.data.statusText);
            });
        }

        vm.onBacktoVendorHome = function(){
            commonUtility.redirectTo("groundVendorHome");
        };

        vm.onAssignedReqClick = function(){
            commonUtility.redirectTo("vendorRaisedReq");
        };
        
        vm.onAcceptedReqClick = function(){
            commonUtility.setRootScopeProperty(
                constantLoader.rootScopeTypes.TCK_STATUS, 
                constantLoader.ticketStatusTypes.ACCEPTED);
            commonUtility.redirectTo("vendorRespondedReq");
        };
        
        vm.onDeclinedReqClick = function(){
            commonUtility.setRootScopeProperty(
                constantLoader.rootScopeTypes.TCK_STATUS, 
                constantLoader.ticketStatusTypes.DECLINED);
            commonUtility.redirectTo("vendorRespondedReq");
        };
        
        vm.onClosedReqClick = function(){
            commonUtility.setRootScopeProperty(
                constantLoader.rootScopeTypes.TCK_STATUS, 
                constantLoader.ticketStatusTypes.CLOSED);
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