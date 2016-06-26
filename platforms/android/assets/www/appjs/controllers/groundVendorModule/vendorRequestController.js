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
                    window.alert(response.data.statusText);
                } else{
                    window.alert(response.data.statusText);
                }
            }, function(error){
                window.alert("Try again after some time!");
            });
        };

        vm.onBackClick = function(){
            commonUtility.redirectTo("groundVendorHome");
        };

        initialized();
    }
]);