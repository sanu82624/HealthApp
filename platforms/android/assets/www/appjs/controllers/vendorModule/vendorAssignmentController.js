'use strict';

angular.module('cmaManagementApp').controller('vendorAssignmentController',
    function(constantLoader, vendorBusiness, commonUtility, modalUtility){
        
        var vm = this;
        vm.assignment = {};
        vm.isAssigned = false;
        vm.isAccepted = false;
        vm.isClosed = false;
        
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
                    vm.isAssigned = vm.assignment.assgnInfo.status === 
                        constantLoader.ticketStatusTypes.ASSIGNED;
                    vm.isAccepted = vm.assignment.assgnInfo.status ===
                        constantLoader.ticketStatusTypes.ACCEPTED;
                    vm.isClosed = ((vm.assignment.assgnInfo.status === 
                        constantLoader.ticketStatusTypes.CLOSED) ||
                        vm.assignment.assgnInfo.status ===
                        constantLoader.ticketStatusTypes.DECLINED);
                }else{
                    commonUtility.showAlert(response.data.statusText);
                }
            }, function(error){
                commonUtility.showAlert(error.data.statusText);
            });
        }
        
        function updateTicketStatus(vendId, status){
            vendorBusiness.updateTicketStatusByVendor(
                status, commonUtility.getRootScopeProperty(
                constantLoader.rootScopeTypes.ASSN_ID), vendId).then(function(response){
                if(response.data.success){
                    commonUtility.showAlert(response.data.statusText,
                        constantLoader.alertTypes.SUCCESS);
                    if(vm.isAssigned){
                        commonUtility.redirectTo(constantLoader.routeTypes.VENDOR_RAISED_REQ);
                    }else{
                        commonUtility.redirectTo(constantLoader.routeTypes.VENDOR_RESPONDED_REQ);
                    }
                } else{
                    commonUtility.showAlert(response.data.statusText);
                }
            }, function(error){
                commonUtility.showAlert(error.data.statusText);
            });
        }
        
        vm.onUpdateTicketClick = function(vendId, status){
            status = (status === 0) ? constantLoader.ticketStatusTypes.ACCEPTED :
                ((status === 1) ? constantLoader.ticketStatusTypes.DECLINED :
                constantLoader.ticketStatusTypes.CLOSED);
            modalUtility.showConfirm(constantLoader.defaultValues.CLOSED_TICKET_CONFIRM_MSG.replace(
                "#status#", status), 
                constantLoader.defaultValues.CONFIRM_MODAL_POSITIVE_BTN_TEXT, 
                constantLoader.defaultValues.CONFIRM_MODAL_NEGITIVE_BTN_TEXT).then(function(response){
                if(response > 0){
                    updateTicketStatus(vendId, status);
                }
            });
        };
        
        vm.onBackClick = function(){
            commonUtility.deleteRootScopeProperty(
                constantLoader.rootScopeTypes.ASSN_ID);
            if(vm.isAssigned){
                commonUtility.redirectTo(constantLoader.routeTypes.VENDOR_RAISED_REQ);
            }else{
                commonUtility.redirectTo(constantLoader.routeTypes.VENDOR_RESPONDED_REQ);
            }
        };
        
        initialized();
    });

