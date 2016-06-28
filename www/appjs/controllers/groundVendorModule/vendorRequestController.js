'use strict';

angular.module('cmaManagementApp').controller('vendorRequestController',[
    'commonUtility', 'vendorBusiness', '$rootScope', 'messages',
    function(commonUtility, vendorBusiness, $rootScope, messages){
		
        var vm = this;

        vm.requests = [];

        function initialized(){
            loadAssignedRequests();
        }

        function loadAssignedRequests(){
            vendorBusiness.getAssignedRequests($rootScope.ID).then(function(response){
                vm.requests = response.data.result;
                for(var index = 0; index < vm.requests.length; index++){
                    vm.requests[index].createTs = new Date(vm.requests[index].createTs);
                }
            }, function(error){

            });
        }
        
        vm.onTicketStatusClick = function(state, assignmentId, vendId){
            var status = ((state > 0) ? "ACCEPTED" : "DECLINED");
            vendorBusiness.updateTicketStatusByVendor(status, 
                assignmentId, vendId).then(function(response){
                if(response.data.success){
                    commonUtility.showAlert(response.data.statusText);
                } else{
                    commonUtility.showAlert(response.data.statusText);
                }
            }, function(error){
                commonUtility.showAlert(messages.TRY_AGAIN);
            });
        };

        vm.onBackClick = function(){
            commonUtility.redirectTo("groundVendorHome");
        };

        initialized();
    }
]);