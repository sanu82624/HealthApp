'use strict';

angular.module('cmaManagementApp')
    .factory('commonUtility', function ($location, $window, defaultValues) {
	
	var commonUtility = {};
	
	commonUtility.redirectTo = function(route){
            $location.url("/" + route);
	};
        
        commonUtility.showAlert = function(message){
            window.alert(message);
	};
        
        commonUtility.is3DValidKey = function(value){
            return (angular.isDefined(value) && value !== 
                defaultValues.BLANK_STRING && value !== null);
        };
        
        commonUtility.getRelativeUrl = function(relativeUrl, isTimeStamp){
            if(commonUtility.is3DValidKey(isTimeStamp) && isTimeStamp){
                var moment = $window.moment;
                var now = moment();
                relativeUrl = relativeUrl + 
                    ((relativeUrl.indexOf('?') > -1) ? "&" : "?") + "tm=" + now;
            }
            return relativeUrl;
        };
	
	return commonUtility;
  });