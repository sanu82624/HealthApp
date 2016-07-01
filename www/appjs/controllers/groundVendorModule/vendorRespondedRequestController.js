'use strict';

angular.module('cmaManagementApp').controller('vendorRespondedRequestController',
    function(commonUtility, vendorBusiness, $rootScope, constantLoader,
        serviceLoader){
		
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
                constantLoader.ticketStatusTypes.ACCEPTED,
                constantLoader.ticketStatusTypes.DECLINED,
                constantLoader.ticketStatusTypes.CLOSED
            ];
            vm.tckType = constantLoader.ticketStatusTypes.ACCEPTED;
        }

        function loadRespondedRequests(){
            vendorBusiness.getAssignedRequests($rootScope.ID).then(function(response){
                vm.requests = serviceLoader.filter('filter')(response.data.result, 
                    {status: vm.tckType});
            }, function(error){
                
            });
        }
        
        vm.onTicketStatusClick = function(assignmentId, vendId){
            vendorBusiness.updateTicketStatusByVendor(constantLoader.ticketStatusTypes.CLOSED, 
                assignmentId, vendId).then(function(response){
                if(response.data.success){
                    commonUtility.showAlert(response.data.statusText);
                } else{
                    commonUtility.showAlert(response.data.statusText);
                }
            }, function(error){
                commonUtility.showAlert(constantLoader.messages.TRY_AGAIN);
            });
        };

        vm.onBackClick = function(){
            commonUtility.redirectTo("groundVendorHome");
        };

        initialized();
    }
);