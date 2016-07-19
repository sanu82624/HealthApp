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
            }, function(error){

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

        vm.onBackClick = function(){
            commonUtility.redirectTo(constantLoader.routeTypes.VENDOR_HOME);
        };

        initialized();
    }
);