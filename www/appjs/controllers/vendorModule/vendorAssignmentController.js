'use strict';

angular.module('cmaManagementApp').controller('vendorAssignmentController',
    function(constantLoader, vendorBusiness, commonUtility, modalUtility){
        
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
                    var statusCss = commonUtility.getFilterArray(
                        commonUtility.getJsonFromString(constantLoader.defaultValues.TCK_STATUSES),
                        {"code": vm.assignment.assgnInfo.status});
                    if(statusCss.length > 0){
                        vm.assignment.statusTheme = statusCss[0].color;
                    }
                }else{
                    commonUtility.showAlert(response.data.statusText);
                }
            }, function(error){
                commonUtility.showAlert(error.data.statusText);
            });
        }
        
        vm.onCloseTicketClick = function(vendId){
            modalUtility.showConfirm(constantLoader.defaultValues.CLOSED_TICKET_CONFIRM_MSG, 
                constantLoader.defaultValues.CONFIRM_MODAL_POSITIVE_BTN_TEXT, 
                constantLoader.defaultValues.CONFIRM_MODAL_NEGITIVE_BTN_TEXT).then(function(response){
                if(response > 0){
                    vendorBusiness.updateTicketStatusByVendor(
                        constantLoader.ticketStatusTypes.CLOSED, 
                        commonUtility.getRootScopeProperty(
                        constantLoader.rootScopeTypes.ASSN_ID), vendId).then(function(response){
                        if(response.data.success){
                            commonUtility.showAlert(response.data.statusText,
                                constantLoader.alertTypes.SUCCESS);
                            commonUtility.redirectTo(constantLoader.routeTypes.VENDOR_RESPONDED_REQ);
                        } else{
                            commonUtility.showAlert(response.data.statusText);
                        }
                    }, function(error){
                        commonUtility.showAlert(error.data.statusText);
                    });
                }
            }, function(){
                commonUtility.showAlert(constantLoader.messages.TICKET_NOT_CLOSED);
            });
        };
        
        vm.onBackClick = function(){
            commonUtility.deleteRootScopeProperty(
                constantLoader.rootScopeTypes.ASSN_ID);
            commonUtility.redirectTo(constantLoader.routeTypes.VENDOR_RESPONDED_REQ);
        };
        
        initialized();
    });

