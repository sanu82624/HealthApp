'use strict';

angular.module('cmaManagementApp')
    .factory('generalUtility', function (dataLayer, relativeUrls) {
	
	var generalUtility = {};
	
	generalUtility.loadServiceType = function(){
            return dataLayer.getAsync(relativeUrls.SERVICE_TYPE);
	};
	
	return generalUtility;
  });