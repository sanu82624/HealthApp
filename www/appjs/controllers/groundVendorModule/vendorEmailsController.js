'use strict';

angular.module('cmaManagementApp').controller('vendorEmailsController',[
    'commonUtility', '$rootScope', 'vendorBusiness', 'validationPattern', 'messages',
    function(commonUtility, $rootScope, vendorBusiness, validationPattern, messages){

        var vm = this;
        vm.emails = [];
        vm.validEmail = validationPattern.EMAIL;
        
        function initialization(){
            loadEmails();
        }
        
        function loadEmails(){
            vendorBusiness.loadVendorInfo($rootScope.ID).then(function(response){
                if(response.data.success){
                    if(angular.isDefined(response.data.result.email) &&
                        response.data.result.email !== null){
                        vm.emails = response.data.result.email;
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

        vm.onAddEmailClick = function(isNotValidEmail){
            if(isNotValidEmail || vm.email === "" || 
                vm.email === null || angular.isUndefined(vm.email)){
                commonUtility.showAlert(messages.VALID_EMAIL);
                return false;
            }
            for(var index=0; index<=vm.emails.length - 1; index++){
                if(vm.emails[index] === vm.email){
                    vm.email = "";
                    commonUtility.showAlert(messages.ALREADY_ADDED);
                    return false;
                }
            }
            vm.emails.push(vm.email);
            vm.email = "";
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
            vendor.vendId = $rootScope.ID;
            vendor.email = vm.emails;
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
]);