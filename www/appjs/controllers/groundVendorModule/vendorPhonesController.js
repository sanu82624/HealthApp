'use strict';

angular.module('cmaManagementApp').controller('vendorPhonesController',
    function(commonUtility, $rootScope, vendorBusiness, constantLoader){

        var vm = this;
        vm.phones = [];
        vm.validPhone = constantLoader.validationPattern.PHONE;
        
        function initialization(){
            loadPhones();
        }
        
        function loadPhones(){
            vendorBusiness.loadVendorInfo($rootScope.ID).then(function(response){
                if(response.data.success){
                    if(angular.isDefined(response.data.result.contacts) &&
                        response.data.result.contacts !== null){
                        vm.phones = response.data.result.contacts;
                    }
                }else{
                    commonUtility.showAlert(response.data.statusText);
                    commonUtility.redirectTo("vendorProfile");
                }
            }, function(error){
                commonUtility.showAlert(error.data);
                commonUtility.redirectTo("vendorProfile");
            });
        };

        vm.onBackClick = function(){
            commonUtility.redirectTo("vendorProfile");
        };

        vm.onAddPhoneClick = function(isNotValidPhone){
            if(isNotValidPhone || vm.phone === "" || 
                vm.phone === null || angular.isUndefined(vm.phone)){
                commonUtility.showAlert(constantLoader.messages.VALID_PHONE);
                return false;
            }
            for(var index=0; index<=vm.phones.length - 1; index++){
                if(vm.phones[index] === vm.phone){
                    vm.phone = "";
                    commonUtility.showAlert(constantLoader.messages.ALREADY_ADDED);
                    return false;
                }
            }
            vm.phones.push(vm.phone);
            vm.phone = "";
        };

        vm.onPhoneDeleteClick = function(record){
            for(var index=0; index<=vm.phones.length - 1; index++){
                if(vm.phones[index] === record){
                    vm.phones.splice(index, 1);
                    return;
                }
            }
        };
        
        vm.onSaveClick = function(){
            var vendor = {};
            vendor.vendId = $rootScope.ID;
            vendor.contacts = vm.phones;
            vendorBusiness.updateVendorDetails(vendor).then(function(response){
                commonUtility.showAlert(response.data.statusText);
                if(response.data.success){
                    commonUtility.redirectTo("vendorProfile");
                }
            }, function(error){
                commonUtility.showAlert(error.data);
            });
        };
        
        initialization();
    }
);