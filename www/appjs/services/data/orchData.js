'use strict';

angular.module('cmaManagementApp')
  .factory('orchData', function (dataLayer, constantLoader, commonUtility) {
    
    var orchData = {};
    
    orchData.validateOrch = function(email, pass) {
        return dataLayer.postAsync(commonUtility.getRelativeUrl(
            constantLoader.relativeUrls.USER_LOGIN_VALIDATE + 
            "?email="+email+"&password="+pass), null, 
            constantLoader.headerTypes.CONTENT_ONLY);
    };
	
    orchData.registerOrch = function(request) {
        return dataLayer.postAsync(commonUtility.getRelativeUrl(
            constantLoader.relativeUrls.USER_REG), request);
    };
    
    return orchData;
  });
