'use strict';

angular.module('cmaManagementApp')
    .factory('commonUtility', function ($location) {
	
	var commonUtility = {};
	
	commonUtility.redirectTo = function(route){
            $location.url("/" + route);
	};
        
        commonUtility.showAlert = function(message){
            window.alert(message);
	};
	
	return commonUtility;
  });