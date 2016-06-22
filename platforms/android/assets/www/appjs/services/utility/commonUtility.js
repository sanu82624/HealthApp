
angular.module('cmaManagementApp')
  .factory('commonUtility', function ($location) {
	
	var commonUtility = {};
	
	commonUtility.redirectTo = function(route){
		
		$location.url("/" + route);
	};
	
	return commonUtility;
  });