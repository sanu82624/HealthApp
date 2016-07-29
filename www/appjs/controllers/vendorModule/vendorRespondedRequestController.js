'use strict';

angular.module('cmaManagementApp').controller('vendorRespondedRequestController',
    function(commonUtility, vendorBusiness, constantLoader, serviceLoader){
		
        var vm = this;

        vm.requests = [];
        vm.tckType = constantLoader.defaultValues.BLANK_STRING;

        function initialized(){
            loadRequests();
        }

        function loadRequests(){
            if(commonUtility.is3DValidKey(commonUtility.getRootScopeProperty(
                constantLoader.rootScopeTypes.TCK_STATUS))){
                vm.tckType = commonUtility.getRootScopeProperty(
                    constantLoader.rootScopeTypes.TCK_STATUS);
                
                vendorBusiness.getAssignedRequests(commonUtility.getRootScopeProperty(
                    constantLoader.rootScopeTypes.ID)).then(function(response){
                    if(response.data.success){
                        vm.requests = serviceLoader.filter('filter')(response.data.result, 
                            {status: vm.tckType});
                        for(var index=0; index<vm.requests.length; index++){
                            var statusCss = commonUtility.getFilterArray(
                                commonUtility.getJsonFromString(constantLoader.defaultValues.TCK_STATUSES),
                                {"code": vm.requests[index].status});
                            if(statusCss.length > 0){
                                vm.requests[index].statusTheme = statusCss[0].color;
                            }
                        }
                    }else{
                        commonUtility.showAlert(response.data.statusText);
                    }
                }, function(error){
                    commonUtility.showAlert(error.data.statusText);
                });
            }
            
        }
        
        vm.onTicketDetailsClick = function(assignmentId){
            commonUtility.setRootScopeProperty(constantLoader.rootScopeTypes.ASSN_ID,
                assignmentId);
            commonUtility.redirectTo(constantLoader.routeTypes.VENDOR_ASSN_DTLS);
        };

        vm.onBackClick = function(){
            commonUtility.redirectTo(constantLoader.routeTypes.VENDOR_HOME);
        };

        initialized();
    }
);