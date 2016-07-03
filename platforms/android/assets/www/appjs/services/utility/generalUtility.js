'use strict';

angular.module('cmaManagementApp')
    .factory('generalUtility', function (dataLayer, constantLoader, commonUtility) {
	
	var generalUtility = {};
	
	generalUtility.loadServiceType = function(){
            return dataLayer.getAsync(
                commonUtility.getRelativeUrl(constantLoader.relativeUrls.SERVICE_TYPE));
	};
        
        generalUtility.loadCountries = function(){
            return dataLayer.getAsync(
                commonUtility.getRelativeUrl(constantLoader.relativeUrls.COUNTRY));
	};
	
	return generalUtility;
  });