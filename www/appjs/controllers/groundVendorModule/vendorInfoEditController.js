'use strict';

angular.module('cmaManagementApp').controller('vendorInfoEditController',[
    'validationPattern', 'messages', 'vendorBusiness', 'commonUtility',
    '$rootScope',
    function(validationPattern, messages, vendorBusiness, commonUtility,
    $rootScope){
		
        var vm = this;
        vm.vendorInfo = {};

        vm.validName = validationPattern.NAME;
        vm.nameMsg = messages.VALID_NAME;
        vm.pinMsg = messages.REQ_PIN;
        
        function initialized(){
            loadVendorDetails();
        }
        
        function loadVendorDetails(){
            vendorBusiness.loadVendorInfo($rootScope.ID).then(function(response){
                if(response.data.success){
                    vm.vendorInfo = response.data.result;
                }else{
                    window.alert(response.data.statusText);
                    commonUtility.redirectTo("vendorProfile");
                }
            }, function(error){
                window.alert(error.data);
                commonUtility.redirectTo("vendorProfile");
            });
        }
        
        vm.onSaveClick = function(frmData){
            if(!frmData.vendorInfoForm.$valid){
                return false;
            }
            var vendor = {};
            vendor.vendId = $rootScope.ID;
            vendor.name = vm.vendorInfo.name;
            vendor.pin = vm.vendorInfo.pin;
            vendor.description = vm.vendorInfo.description;
            vendor.address = vm.vendorInfo.address;
			
            vendorBusiness.updateVendorDetails(vendor).then(function(response){
                if(response.data.success){
                    $rootScope.NAME = vendor.name;
                    window.alert(response.data.statusText);
                    commonUtility.redirectTo("vendorProfile");
                } else{
                    window.alert(response.data.statusText);
                }
            }, function(error){
                window.alert(error.data);
            });
        };
		
        vm.onCancelClick = function(){
            commonUtility.redirectTo("vendorProfile");
        };

        initialized();
    }
]);