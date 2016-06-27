
angular.module('cmaManagementApp')
  .factory('vendorData', function (dataLayer, relativeUrls, headerTypes) {
    
    var vendorData = {};
    
    vendorData.getAssignedRequests = function(vendId) {
        return dataLayer.getAsync(relativeUrls.VENDOR_ASSIGNED_REQUEST + vendId);
    };
	
    vendorData.registerVendor = function(request) {
        return dataLayer.postAsync(relativeUrls.VENDOR_REG, request);
    };
	
    vendorData.validateVendor = function(email, pass) {
        return dataLayer.postAsync(relativeUrls.VENDOR_LOGIN_VALIDATE + 
            "?login="+email+"&password="+pass, null, headerTypes.CONTENT_ONLY);
    };
	
    vendorData.getVendorDetails = function(vendId) {
        return dataLayer.getAsync(relativeUrls.VENDOR_DETAILS + vendId);
    };
    
    vendorData.updateTicketStatusByVendor = function(status, assignementId, vendId) {
        return dataLayer.postAsync(relativeUrls.VENDOR_TICKET_STATUS_CHANGED, 
            "assignmentId=" + assignementId + "&status=" + status + 
            "&updatedBy=" + vendId, headerTypes.ENCODED_CONTENT);
    };
	
    return vendorData;
  });
