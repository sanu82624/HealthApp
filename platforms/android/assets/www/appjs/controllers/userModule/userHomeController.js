
angular.module('cmaManagementApp').controller('userHomeController',[
	'commonUtility', '$rootScope',
	function(commonUtility, $rootScope){
		
		var vm = this;
		
		vm.onNewRequestClick = function(){
			commonUtility.redirectTo("newReq");
		};
		
		vm.onMyRequestClick = function(){
			commonUtility.redirectTo("myReq");
		};
		
		vm.onProfileClick = function(){
			commonUtility.redirectTo("userProfile");
		};
		
		vm.onLogoutClick = function(){
			$rootScope.ClientId = "";
			$rootScope.IS_SIGN_IN = false;
			$rootScope.NAME = "";
			commonUtility.redirectTo("appHome");
		};
	}
]);