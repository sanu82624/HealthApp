'use strict';

angular.module('cmaManagementApp').controller('vendorRespondedRequestController',
    function(commonUtility, vendorBusiness, constantLoader, serviceLoader){
		
        var vm = this;

        vm.requests = [];
        vm.ticketTypes = [];
        vm.tckType = "";

        function initialized(){
            loadTicketTypes();
            loadRespondedRequests();
        }
        
        function loadTicketTypes(){
            vm.ticketTypes = [
                {code: constantLoader.ticketStatusTypes.ACCEPTED},
                {code: constantLoader.ticketStatusTypes.DECLINED},
                {code: constantLoader.ticketStatusTypes.CLOSED}
            ];
            vm.tckType = constantLoader.ticketStatusTypes.ACCEPTED;
        }

        function loadRespondedRequests(){
            vendorBusiness.getAssignedRequests(commonUtility.getRootScopeProperty(
                constantLoader.rootScopeTypes.ID)).then(function(response){
                vm.requests = serviceLoader.filter('filter')(response.data.result, 
                    {status: vm.tckType});
            }, function(error){
                commonUtility.showAlert(error.data);
            });
        }
        
        vm.onTckTypeChange = function(){
            loadRespondedRequests();
        };
        
        vm.onTicketStatusClick = function(assignmentId, vendId){
            vendorBusiness.updateTicketStatusByVendor(constantLoader.ticketStatusTypes.CLOSED, 
                assignmentId, vendId).then(function(response){
                if(response.data.success){
                    commonUtility.showAlert(response.data.statusText);
                } else{
                    commonUtility.showAlert(response.data.statusText);
                }
            }, function(error){
                commonUtility.showAlert(error.data.statusText);
            });
        };

        vm.onBackClick = function(){
            commonUtility.redirectTo("groundVendorHome");
        };

        initialized();
    }
);