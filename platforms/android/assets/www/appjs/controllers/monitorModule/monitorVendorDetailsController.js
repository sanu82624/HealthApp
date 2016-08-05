'use strict';

angular.module('cmaManagementApp').controller('monitorVendorDetailsController',
    function(commonUtility, vendorBusiness, constantLoader, generalUtility,
        serviceLoader){

        var vm = this;

        vm.vendor = {};
        var serviceTypes = [];

        function initialize(){
            loadServiceTypes();
            loadVendor();
        }
        
        function loadServiceTypes(){
            generalUtility.loadServiceType().then(function(response){
                if(response.data.success){
                    if(response.data.result !== null){
                        angular.forEach(response.data.result, function(value, key) {
                            serviceTypes.push({
                                code: key,
                                name: value
                            });
                        });
                    }
                } else{
                    commonUtility.showAlert(response.data.statusText);
                }
            }, function(error){
                commonUtility.showAlert(error.data.statusText);
            });
        }
		
        function loadVendor(){
            if(commonUtility.is3DValidKey(commonUtility.getRootScopeProperty(
                constantLoader.rootScopeTypes.ASSOCIATE_ID))){
                vendorBusiness.getVendorDetails(commonUtility.getRootScopeProperty(
                    constantLoader.rootScopeTypes.ASSOCIATE_ID)).then(function(response){
                    if(response.data.success){
                        vm.vendor = response.data.result;
                        vm.vendor.badge = vm.vendor.active ? 
                            constantLoader.defaultValues.ACTIVE :
                            constantLoader.defaultValues.INACTIVE;
                        vm.vendor.badgeColor = vm.vendor.active ? 
                            constantLoader.defaultValues.BADGE_COLOR_ACTIVE :
                            constantLoader.defaultValues.BADGE_COLOR_INACTIVE;
                        var types = commonUtility.getFilterArray(serviceTypes, {code: vm.vendor.vendType});
                        if(types.length > 0){
                            vm.vendor.vendType = types[0].name;
                        }
                        loadLocations();
                        loadTickets();
                    }else{
                        commonUtility.showAlert(response.data.statusText);
                    }
                }, function(error){
                    commonUtility.showAlert(error.data.statusText);
                });
            } else{
                
            }
        }
        
        function loadLocations(){
            vendorBusiness.loadChildren(commonUtility.getRootScopeProperty(
                constantLoader.rootScopeTypes.ASSOCIATE_ID)).then(function(response){
                if(response.data.success){
                    vm.vendor.locations = response.data.result;
                }else{
                    commonUtility.showAlert(response.data.statusText);
                }
            }, function(error){
                commonUtility.showAlert(error.data.statusText);
            });
        }
        
        function loadTickets(){
            vendorBusiness.getAssignedRequests(commonUtility.getRootScopeProperty(
                constantLoader.rootScopeTypes.ASSOCIATE_ID)).then(function(response){
                if(response.data.success){
                    vm.vendor.assignedReqCount = (serviceLoader.filter('filter')(response.data.result, 
                        {status: constantLoader.ticketStatusTypes.ASSIGNED})).length;
                    vm.vendor.acceptedReqCount = (serviceLoader.filter('filter')(response.data.result, 
                        {status: constantLoader.ticketStatusTypes.ACCEPTED})).length;
                    vm.vendor.declinedReqCount = (serviceLoader.filter('filter')(response.data.result, 
                        {status: constantLoader.ticketStatusTypes.DECLINED})).length;
                    vm.vendor.closedReqCount = (serviceLoader.filter('filter')(response.data.result, 
                        {status: constantLoader.ticketStatusTypes.CLOSED})).length;
                }else{
                    commonUtility.showAlert(response.data.statusText);
                }
            }, function(error){
                commonUtility.showAlert(error.data.statusText);
            });
        }
		
        vm.onDetailsBackClick = function(){
            commonUtility.redirectTo(constantLoader.routeTypes.MONITOR_ALL_VENDOR);
        };
        
        vm.onLocationClick = function(id){
            commonUtility.setRootScopeProperty(
                constantLoader.rootScopeTypes.LOC_VEND_ID, id);
            commonUtility.redirectTo(constantLoader.routeTypes.MONITOR_VENDOR_LOC);
        };
		
        initialize();
    });