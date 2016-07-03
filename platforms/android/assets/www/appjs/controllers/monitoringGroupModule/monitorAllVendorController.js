'use strict';

angular.module('cmaManagementApp').controller('monitorAllVendorController',
    function(commonUtility, monitorBusiness, $rootScope, $scope, generalUtility){

        var vm = this;

        vm.serviceTypes = [];
        vm.vendors = {};
        vm.type = "";

        function initialize(){
            loadServiceTypes();
        }
        
        function loadServiceTypes(){
            generalUtility.loadServiceType().then(function(response){
                if(response.data.success){
                    if(response.data.result !== null){
                        angular.forEach(response.data.result, function(value, key) {
                            vm.serviceTypes.push({
                                code: key,
                                name: value
                            });
                        });
                        vm.type = vm.serviceTypes[0].code;
                        loadVendors();
                    }
                } else{
                    commonUtility.showAlert(response.data.statusText);
                }
            }, function(error){
                commonUtility.showAlert(error.data);
            });
        }

        function loadVendors(){
            monitorBusiness.getVendors(vm.type).then(function(response){
                if(response.data.success){
                    vm.vendors = response.data.result;
                }
            }, function(error){
                commonUtility.showAlert(error.data);
            });
        }
        
        vm.onServiceTypeChange = function(){
            loadVendors();
        };
		
        vm.onBackClick = function(){
            commonUtility.redirectTo("monitoringGroupHome");
        };
		
        vm.onVendorDetailsClick = function(vendId){
            $rootScope.vendId = vendId;
            commonUtility.redirectTo("monitorVendorDetails");
        };

        initialize();
    }
);