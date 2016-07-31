
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
    
    vendorBusiness.updateVendorDetails = function(vendor) {
        return vendorData.updateVendorDetails(vendor);
    };
    
    vendorBusiness.loadVendorInfo = function(vendId) {
        return vendorData.loadVendorInfo(vendId);
    };
    
    vendorBusiness.changeVendorPassword = function(email, currentPass, newPass) {
        return vendorData.changeVendorPassword(email, currentPass, newPass);
    };
    
    vendorBusiness.loadChildren = function(vendId) {
        return vendorData.loadChildren(vendId);
    };
    
    vendorBusiness.loadAssignmentDetailsById = function(assnId) {
        return vendorData.loadAssignmentDetailsById(assnId);
    };
	
    return vendorBusiness;
  });