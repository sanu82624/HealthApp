
angular.module('cmaManagementApp').controller('appHomeController',[
	'commonUtility', '$rootScope',
	function(commonUtility, $rootScope){
	    
		var vm = this;
		
		vm.onServiceManagementClick = function(){
			commonUtility.redirectTo("serviceManagementHome");
		};
		
		vm.onOnGroundVendorClick = function(){
			commonUtility.redirectTo("vendorLogin");
		};
		
		vm.onMonitoringGrpClick = function(){
			commonUtility.redirectTo("monitoringGroupHome");
		};
		
		vm.onUserManagementClick = function(){
			commonUtility.redirectTo("login");
		};
		
		vm.onUserRegistrationClick = function(){
			commonUtility.redirectTo("reg");
		};

		$rootScope.serviceTypes = [
			{
				code : 'AMB', 
				desc: 'Ambulance',
				symbol: 'glyphicon glyphicon-plus'
			},
			{
				code : 'MED', 
				desc: 'Medicine',
				symbol: 'glyphicon glyphicon-tint'
			},
			{
				code : 'ASST', 
				desc: 'Medical Assistance',
				symbol: 'glyphicon glyphicon-adjust'
			},
			{
				code : 'DOC', 
				desc: 'Doctor',
				symbol: 'glyphicon glyphicon-plus-sign'
			},
			{
				code : 'HOSP', 
				desc: 'Hospital',
				symbol: 'glyphicon glyphicon-plus-sign'
			},
			{
				code : 'MR', 
				desc: 'Medical Reprentitive',
				symbol: 'glyphicon glyphicon-plus-sign'
			}];
}]);