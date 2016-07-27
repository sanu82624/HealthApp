'use strict';

angular.module('cmaManagementApp').controller('vendorAssignmentController',
    function(constantLoader, vendorBusiness, commonUtility){
        
        var vm = this;
        vm.assignment = {};
        
        function initialized(){
            loadAssignmentDetails();
        }
        
        function loadAssignmentDetails(){
            vendorBusiness.loadAssignmentDetailsById(
                commonUtility.getRootScopeProperty(
                constantLoader.rootScopeTypes.ASSN_ID)).then(function(response){
                if(response.data.success){
                    vm.assignment = response.data.result;
                }else{
                    commonUtility.showAlert(response.data.statusText);
                }
            }, function(error){
                commonUtility.showAlert(error.data.statusText);
            });
        }
        
        vm.onCloseTicketClick = function(){
            commonUtility.redirectTo(constantLoader.routeTypes.VENDOR_LOC_EDIT);
        };
        
        vm.onBackClick = function(){
            commonUtility.deleteRootScopeProperty(
                constantLoader.rootScopeTypes.ASSN_ID);
            //commonUtility.redirectTo(constantLoader.routeTypes.VENDOR_LOC);
        };
        
        initialized();
    });

