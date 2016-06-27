'use strict';

angular.module('cmaManagementApp').controller('vendorRegistrationController',[
    'validationPattern', 'messages', 'vendorBusiness', 'commonUtility',
    '$rootScope', 'generalUtility',
    function(validationPattern, messages, vendorBusiness, commonUtility,
    $rootScope, generalUtility){
		
        var vm = this;

        vm.validName = validationPattern.NAME;
        vm.validEmail = validationPattern.EMAIL;
        vm.validPhone = validationPattern.PHONE;
        vm.emailMsg = messages.VALID_EMAIL;
        vm.passMsg = messages.VALID_PASS;
        vm.nameMsg = messages.VALID_NAME;
        vm.pinMsg = messages.REQ_PIN;
        vm.phoneMsg = messages.VALID_PHONE;
        vm.serviceTypeMsg = messages.REQ_SERVICE_TYPE;
        
        vm.serviceTypes = [];

        function initialized(){
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
                    }
                } else{
                    window.alert(response.data.statusText);
                }
            }, function(error){
                window.alert(error.data);
            });
        }
		
        vm.onSaveClick = function(frmData){
            if(!frmData.vendorRegForm.$valid){
                return false;
            }
            var vendorInfo = {};
            vendorInfo.login = vm.email;
            vendorInfo.password = vm.pass;
            vendorInfo.vendorDetails = {};
            vendorInfo.vendorDetails.name = vm.name;
            vendorInfo.vendorDetails.vendType = vm.type;
            vendorInfo.vendorDetails.address = vm.address;
            vendorInfo.vendorDetails.description = vm.desc;
            vendorInfo.vendorDetails.pin = vm.pinCode;
            vendorInfo.vendorDetails.contacts = [vm.phone];
            vendorInfo.vendorDetails.active = true;
			
            vendorBusiness.registerVendor(vendorInfo).then(function(response){
                if(response.data.success){
                    window.alert(messages.USER_REG_SUCCESS);
                    $rootScope.IS_SIGN_IN = response.data.success;
                    $rootScope.NAME = response.data.result.name;
                    $rootScope.ID = response.data.result.vendId;
                    $rootScope.vendorType = response.data.result.vendType;
                    commonUtility.redirectTo("groundVendorHome");
                } else{
                    window.alert(messages.USER_REG_FAIL);
                }
            }, function(error){
                window.alert(messages.USER_REG_FAIL);
            });
        };
		
        vm.onCancelClick = function(){
            commonUtility.redirectTo("vendorLogin");
        };

        initialized();
    }
]);