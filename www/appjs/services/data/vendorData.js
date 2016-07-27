
angular.module('cmaManagementApp')
  .factory('vendorData', function (dataLayer, constantLoader, commonUtility) {
    
    var vendorData = {};
    
    vendorData.getAssignedRequests = function(vendId) {
        return dataLayer.getAsync(commonUtility.getRelativeUrl(
            constantLoader.relativeUrls.VENDOR_ASSIGNED_REQUEST + vendId));
    };
	
    vendorData.registerVendor = function(request) {
        return dataLayer.postAsync(commonUtility.getRelativeUrl(
            constantLoader.relativeUrls.VENDOR_REG), request);
    };
	
    vendorData.validateVendor = function(email, pass) {
        return dataLayer.postAsync(commonUtility.getRelativeUrl(
            constantLoader.relativeUrls.VENDOR_LOGIN_VALIDATE + 
            "?login="+email+"&password="+pass), null, constantLoader.headerTypes.CONTENT_ONLY);
    };
	
    vendorData.getVendorDetails = function(vendId) {
        return dataLayer.getAsync(commonUtility.getRelativeUrl(
            constantLoader.relativeUrls.VENDOR_DETAILS + vendId));
    };
    
    vendorData.updateTicketStatusByVendor = function(status, assignementId, vendId) {
        return dataLayer.postAsync(commonUtility.getRelativeUrl(
            constantLoader.relativeUrls.VENDOR_TICKET_STATUS_CHANGED), 
            "assignmentId=" + assignementId + "&status=" + status + 
            "&updatedBy=" + vendId, constantLoader.headerTypes.ENCODED_CONTENT);
    };
    
    vendorData.updateVendorDetails = function(vendor) {
        return dataLayer.postAsync(commonUtility.getRelativeUrl(
            constantLoader.relativeUrls.VENDOR_UPDATE), vendor);
    };
    
    vendorData.loadVendorInfo = function(vendId) {
        return dataLayer.getAsync(commonUtility.getRelativeUrl(
            constantLoader.relativeUrls.VENDOR_DETAILS_BY_ID + vendId));
    };
    
    vendorData.changeVendorPassword = function(email, currentPass, newPass) {
        return dataLayer.postAsync(commonUtility.getRelativeUrl(
            constantLoader.relativeUrls.VENDOR_PASS_CHANGE + 
            "?email=" + email + "&oldPassword=" + currentPass +
            "&newPassword=" + newPass), null, constantLoader.headerTypes.ENCODED_CONTENT);
    };
    
    vendorData.loadChildren = function(vendId) {
        return dataLayer.getAsync(commonUtility.getRelativeUrl(
            constantLoader.relativeUrls.VENDOR_CHILD + vendId));
    };
    
    vendorData.loadAssignmentDetailsById = function(assnId) {
        return dataLayer.getAsync(commonUtility.getRelativeUrl(
            constantLoader.relativeUrls.VENDOR_ASSN + assnId));
    };
	
    return vendorData;
  });
