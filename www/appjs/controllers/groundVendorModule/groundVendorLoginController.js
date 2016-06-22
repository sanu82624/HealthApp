
angular.module('cmaManagementApp').controller('groundVendorLoginController',[
	'messages', 'vendorBusiness', 'commonUtility', '$rootScope',
	function(messages, vendorBusiness, commonUtility, $rootScope){
		
		var vm = this;
		
		vm.emailMsg = messages.VALID_EMAIL;
		vm.passMsg = messages.VALID_PASS;
		
		vm.onLoginClick = function(){
			vendorBusiness.validateVendor(vm.email, vm.pass).then(function(response){
				if(response.data.success){
					$rootScope.IS_SIGN_IN = response.data.success;
					$rootScope.NAME = response.data.result.name;
					$rootScope.ID = response.data.result.vendId;
					$rootScope.vendorType = response.data.result.vendType;
					commonUtility.redirectTo("groundVendorHome");
				} else{
					window.alert(messages.USER_LOGIN_WRONG);
				}
			}, function(error){
				window.alert(messages.USER_LOGIN_FAIL);
			});
		};
		
		vm.onCreateAccountClick = function(){
			commonUtility.redirectTo("vendorReg");
		};
	}
]);