
angular.module('cmaManagementApp')
  .factory('vendorData', function (dataLayer, relativeUrls) {
    
    var vendorData = {};
    
    vendorData.getRaisedRequests = function(requestType) {
        
        return dataLayer.getAsync(relativeUrls.VENDOR_RAISED_REQUEST + requestType);
    };
	
	vendorData.registerVendor = function(request) {
        
        return dataLayer.postAsync(relativeUrls.VENDOR_REG, request);
    };
	
	vendorData.validateVendor = function(email, pass) {
        
        return dataLayer.postWithUrlAsync(relativeUrls.VENDOR_LOGIN_VALIDATE + "?login="+email+"&password="+pass);
    };
	
	vendorData.getVendorDetails = function(vendId) {
        
        return dataLayer.getAsync(relativeUrls.VENDOR_DETAILS + vendId);
    };
	
	return vendorData;
  });
