
angular.module('cmaManagementApp')
  .factory('userData', function (dataLayer, relativeUrls) {
    
    var userData = {};
    
    userData.createNewRequest = function(request) {
        
        return dataLayer.postAsync(relativeUrls.CREATE_REQUEST, request);
    };
	
	userData.loadMyRequests = function(userId) {
        
        return dataLayer.getAsync(relativeUrls.MY_REQUEST + userId);
    };
	
	userData.validateUser = function(email, pass) {
        
        return dataLayer.postWithUrlAsync(relativeUrls.USER_LOGIN_VALIDATE + "?email="+email+"&password="+pass);
    };
	
	userData.registerUser = function(request) {
        
        return dataLayer.postAsync(relativeUrls.USER_REG, request);
    };
	
	return userData;
  });
