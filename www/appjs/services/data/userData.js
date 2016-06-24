
angular.module('cmaManagementApp')
  .factory('userData', function (dataLayer, relativeUrls, headerTypes) {
    
    var userData = {};
    
    userData.createNewRequest = function(request) {
        
        return dataLayer.postAsync(relativeUrls.CREATE_REQUEST, request);
    };
	
	userData.loadMyRequests = function(userId) {
        
        return dataLayer.getAsync(relativeUrls.MY_REQUEST + userId);
    };
	
	userData.validateUser = function(email, pass) {
        
        return dataLayer.postAsync(relativeUrls.USER_LOGIN_VALIDATE + 
            "?email="+email+"&password="+pass, null, headerTypes.CONTENT_ONLY);
    };
	
	userData.registerUser = function(request) {
        
        return dataLayer.postAsync(relativeUrls.USER_REG, request);
    };
	
	return userData;
  });
