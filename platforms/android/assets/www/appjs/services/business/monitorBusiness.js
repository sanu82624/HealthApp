
angular.module('cmaManagementApp')
  .factory('monitorBusiness', function (monitorData) {
    
    var monitorBusiness = {};
    
    monitorBusiness.getVendors = function(serviceType) {
        return monitorData.getVendors(serviceType);
    };
    
    monitorBusiness.getRequests = function(serviceType) {
        return monitorData.getRequests(serviceType);
    };
    
    return monitorBusiness;
  });