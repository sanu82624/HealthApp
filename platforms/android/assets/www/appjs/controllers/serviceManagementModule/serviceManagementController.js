
angular.module('cmaManagementApp').controller('serviceManagementController',['commonUtility',
	function(commonUtility){
		
		var vm = this;
		
		vm.onHomeClick = function(){
			commonUtility.redirectTo("appHome");
		};
	}
]);