
angular.module('cmaManagementApp').controller('userRegistrationController',[
	'validationPattern', 'messages', 'userBusiness', 'commonUtility',
	'$rootScope',
	function(validationPattern, messages, userBusiness, commonUtility,
	$rootScope){
		
		var vm = this;
		
		vm.validName = validationPattern.NAME;
		vm.validEmail = validationPattern.EMAIL;
		vm.validPhone = validationPattern.PHONE;
		vm.emailMsg = messages.VALID_EMAIL;
		vm.passMsg = messages.VALID_PASS;
		
		vm.onSaveClick = function(){
			
			var userInfo = {};
			userInfo.name = vm.name;
			userInfo.age = vm.age;
			userInfo.address = vm.address;
			userInfo.pinCode = vm.pin;
			userInfo.gender = vm.gender;
			userInfo.phone = [vm.phone];
			userInfo.emailId = [vm.email];
			userInfo.password = vm.pass;
			
			userBusiness.registerUser(userInfo).then(function(response){
				if(response.data.success){
					window.alert(messages.USER_REG_SUCCESS);
					console.info(response);
					$rootScope.IS_SIGN_IN = response.data.success;
					$rootScope.NAME = response.data.result.name;
					$rootScope.ID = response.data.result.clientId;
					commonUtility.redirectTo("groundVendorHome");
				} else{
					window.alert(messages.USER_REG_FAIL);
				}
			}, function(error){
				window.alert(messages.USER_REG_FAIL);
			});
		};
		
		vm.onCancelClick = function(){
			commonUtility.redirectTo("login");
		};
	}
]);