'use strict';

angular.module('cmaManagementApp').controller('vendorPhonesController',[
    'commonUtility', '$rootScope', 'vendorBusiness', 'validationPattern', 'messages',
    function(commonUtility, $rootScope, vendorBusiness, validationPattern, messages){

        var vm = this;
        vm.phones = [];
        vm.validPhone = validationPattern.PHONE;
        
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
                    window.alert(response.data.statusText);
                    commonUtility.redirectTo("vendorProfile");
                }
            }, function(error){
                window.alert(error.data);
                commonUtility.redirectTo("vendorProfile");
            });
        };

        vm.onBackClick = function(){
            commonUtility.redirectTo("vendorProfile");
        };

        vm.onAddPhoneClick = function(isNotValidPhone){
            if(isNotValidPhone){
                window.alert(messages.VALID_PHONE);
                return false;
            }
            for(var index=0; index<=vm.phones.length - 1; index++){
                if(vm.phones[index] === vm.phone){
                    vm.phone = "";
                    window.alert("You have already added!");
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
                window.alert(response.data.statusText);
                if(response.data.success){
                    commonUtility.redirectTo("vendorProfile");
                }
            }, function(error){
                window.alert(error.data);
            });
        };
        
        initialization();
    }
]);