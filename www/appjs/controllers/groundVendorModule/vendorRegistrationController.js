
angular.module('cmaManagementApp').controller('vendorRegistrationController',[
	'validationPattern', 'messages', 'vendorBusiness', 'commonUtility',
	'$rootScope',
	function(validationPattern, messages, vendorBusiness, commonUtility,
	$rootScope){
		
		var vm = this;
		
		vm.validName = validationPattern.NAME;
		vm.validEmail = validationPattern.EMAIL;
		vm.validPhone = validationPattern.PHONE;
		vm.emailMsg = messages.VALID_EMAIL;
		vm.passMsg = messages.VALID_PASS;
		
		function initialized(){
			
		}
		
		vm.onSaveClick = function(){
			var vendorInfo = {};
			vendorInfo.login = vm.email;
			vendorInfo.password = vm.pass;
			vendorInfo.vendorDetails = {};
			vendorInfo.vendorDetails.name = vm.name;
			vendorInfo.vendorDetails.vendType = vm.type;
			vendorInfo.vendorDetails.address = vm.address;
			vendorInfo.vendorDetails.description = vm.desc;
			vendorInfo.vendorDetails.pin = vm.pin;
			vendorInfo.vendorDetails.contacts = [vm.phone];
			vendorInfo.vendorDetails.active = true;
			
			
			vendorBusiness.registerVendor(vendorInfo).then(function(response){
				if(response.data.success){
					window.alert(messages.USER_REG_SUCCESS);
					$rootScope.IS_SIGN_IN = response.data.success;
					$rootScope.NAME = response.data.result.name;
					$rootScope.ID = response.data.result.vendId;
					$rootScope.vendorType = response.data.result.vendType;
					commonUtility.redirectTo("userLanding");
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