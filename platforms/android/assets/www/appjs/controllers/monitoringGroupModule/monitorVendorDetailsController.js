angular.module('cmaManagementApp').controller('monitorVendorDetailsController',[
	'commonUtility', 'vendorBusiness', '$rootScope',
	function(commonUtility, vendorBusiness, $rootScope){

		var vm = this;
		
		vm.vendor = {};
		
		function initialize(){
			loadVendor();
		}
		
		function loadVendor(){
			if(angular.isDefined($rootScope.vendId) && $rootScope.vendId !== null && $rootScope.vendId !== ""){
				vendorBusiness.getVendorDetails($rootScope.vendId).then(function(response){
					if(response.data.success){
						vm.vendor = response.data.result;
					}
				}, function(error){
					commonUtility.redirectTo("monitorAllVendor");
				});
			} else{
				
			}
			
		}
		
		vm.onDetailsBackClick = function(){
			commonUtility.redirectTo("monitorAllVendor");
		};
		
		initialize();
	}
]);