'use strict';

angular.module('cmaManagementApp').controller('vendorEmailsController',
    function(commonUtility, vendorBusiness, constantLoader){

        var vm = this;
        vm.emails = [];
        vm.validEmail = constantLoader.validationPattern.EMAIL;
        
        function initialization(){
            loadEmails();
        }
        
        function loadEmails(){
            vendorBusiness.loadVendorInfo(commonUtility.getRootScopeProperty(
                constantLoader.rootScopeTypes.ID)).then(function(response){
                if(response.data.success){
                    if(angular.isDefined(response.data.result.email) &&
                        response.data.result.email !== null){
                        vm.emails = response.data.result.email;
                    }
                }else{
                    commonUtility.showAlert(response.data.statusText);
                    commonUtility.redirectTo(constantLoader.routeTypes.VENDOR_PROFILE);
                }
            }, function(error){
                commonUtility.showAlert(error.data.statusText);
                commonUtility.redirectTo(constantLoader.routeTypes.VENDOR_PROFILE);
            });
        };

        vm.onBackClick = function(){
            commonUtility.redirectTo(constantLoader.routeTypes.VENDOR_PROFILE);
        };

        vm.onAddEmailClick = function(isNotValidEmail){
            if(isNotValidEmail || vm.email === constantLoader.defaultValues.BLANK_STRING || 
                vm.email === null || angular.isUndefined(vm.email)){
                commonUtility.showAlert(constantLoader.messages.VALID_EMAIL);
                return false;
            }
            for(var index=0; index<=vm.emails.length - 1; index++){
                if(vm.emails[index] === vm.email){
                    vm.email = constantLoader.defaultValues.BLANK_STRING;
                    commonUtility.showAlert(constantLoader.messages.ALREADY_ADDED);
                    return false;
                }
            }
            vm.emails.push(vm.email);
            vm.email = constantLoader.defaultValues.BLANK_STRING;
        };

        vm.onEmailDeleteClick = function(record){
            for(var index=0; index<=vm.emails.length - 1; index++){
                if(vm.emails[index] === record){
                    vm.emails.splice(index, 1);
                    return;
                }
            }
        };
        
        vm.onSaveClick = function(){
            var vendor = {};
            vendor.vendId = commonUtility.getRootScopeProperty(
                constantLoader.rootScopeTypes.ID);
            vendor.email = vm.emails;
            vendorBusiness.updateVendorDetails(vendor).then(function(response){
                commonUtility.showAlert(response.data.statusText);
                if(response.data.success){
                    commonUtility.redirectTo(constantLoader.routeTypes.VENDOR_PROFILE);
                }
            }, function(error){
                commonUtility.showAlert(error.data.statusText);
            });
        };
        
        initialization();
    }
);