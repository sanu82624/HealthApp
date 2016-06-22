angular.module('cmaManagementApp').controller('monitorAllVendorController',[
	'commonUtility', 'monitorBusiness', '$rootScope', '$scope', '$filter',
	function(commonUtility, monitorBusiness, $rootScope, $scope, $filter){

		var vm = this;
		
		vm.type = $rootScope.serviceTypes[0].code;
		vm.vendors = {};
		
		function initialize(){
			loadVendors();
		}
		
		function loadVendors(){
			monitorBusiness.getVendors(vm.type).then(function(response){
				if(response.data.success){
					vm.vendors = response.data.result;
				}
			}, function(error){
				
			});
		}
		
		$scope.$watch("vm.type", function onChangeServiceType(newValue, oldValue) {
                if(newValue !== oldValue){
					loadVendors();
				}
            }
        );
		
		vm.onBackClick = function(){
			commonUtility.redirectTo("monitoringGroupHome");
		};
		
		vm.onVendorDetailsClick = function(vendId){
			$rootScope.vendId = vendId;
			commonUtility.redirectTo("monitorVendorDetails");
		};
		
		initialize();
	}
]);