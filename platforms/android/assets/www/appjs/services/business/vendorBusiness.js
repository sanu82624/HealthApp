
angular.module('cmaManagementApp')
  .factory('vendorBusiness', function (vendorData) {
    
    var vendorBusiness = {};
    
    vendorBusiness.getAssignedRequests = function(vendId) {
        return vendorData.getAssignedRequests(vendId);
    };
	
    vendorBusiness.registerVendor = function(request) {
        return vendorData.registerVendor(request);
    };
	
    vendorBusiness.validateVendor = function(email, pass) {
        return vendorData.validateVendor(email, pass);
    };
	
    vendorBusiness.getVendorDetails = function(vendId) {
        return vendorData.getVendorDetails(vendId);
    };
    
    vendorBusiness.updateTicketStatusByVendor = function(status, assignementId, vendId) {
        return vendorData.updateTicketStatusByVendor(status, assignementId, vendId);
    };
	
    return vendorBusiness;
  });