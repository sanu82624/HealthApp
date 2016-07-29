'use strict';

angular.module('cmaManagementApp').controller('vendorRequestController',
    function(commonUtility, vendorBusiness, constantLoader, serviceLoader){
		
        var vm = this;

        vm.requests = [];

        function initialized(){
            loadAssignedRequests();
        }

        function loadAssignedRequests(){
            vendorBusiness.getAssignedRequests(commonUtility.getRootScopeProperty(
                constantLoader.rootScopeTypes.ID)).then(function(response){
                vm.requests = serviceLoader.filter('filter')(response.data.result, 
                    {status: constantLoader.ticketStatusTypes.ASSIGNED});
                for(var index=0; index<vm.requests.length; index++){
                    var statusCss = commonUtility.getFilterArray(
                        commonUtility.getJsonFromString(constantLoader.defaultValues.TCK_STATUSES),
                        {"code": vm.requests[index].status});
                    if(statusCss.length > 0){
                        vm.requests[index].statusTheme = statusCss[0].color;
                    }
                }
            }, function(error){
                commonUtility.showAlert(error.data.statusText);
            });
        }
        
        vm.onTicketStatusClick = function(state, assignmentId, vendId){
            var status = ((state > 0) ? 
                constantLoader.ticketStatusTypes.ACCEPTED : 
                constantLoader.ticketStatusTypes.DECLINED);
            vendorBusiness.updateTicketStatusByVendor(status, 
                assignmentId, vendId).then(function(response){
                if(response.data.success){
                    commonUtility.showAlert(response.data.statusText,
                        constantLoader.alertTypes.SUCCESS);
                    loadAssignedRequests();
                } else{
                    commonUtility.showAlert(response.data.statusText);
                }
            }, function(error){
                commonUtility.showAlert(error.data.statusText);
            });
        };
        
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