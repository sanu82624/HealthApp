'use strict';

angular.module('cmaManagementApp')
    .factory('commonUtility', function ($location, defaultValues) {
	
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
                var now = moment();
                relativeUrl = relativeUrl + 
                    ((relativeUrl.indexOf('?') > -1) ? "&" : "?") + "tm=" + now;
            }
            return relativeUrl;
        };
        
        commonUtility.getDateFromString = function(value){
            var dateValue = "";
            if(!commonUtility.is3DValidKey(value)){
                return dateValue;
            }
            var values = value.split(".");
            if(values.length > 6){
                dateValue = values[2] + "-" + values[1] +  "-" + values[0] + " " +
                    values[3] + ":" + values[4] + ":" + values[5];
            }
            return dateValue;
        };
	
	return commonUtility;
  });