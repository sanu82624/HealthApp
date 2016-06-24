
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
	
	return vendorBusiness;
  });