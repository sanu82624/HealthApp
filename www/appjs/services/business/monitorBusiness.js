
angular.module('cmaManagementApp')
  .factory('monitorBusiness', function (monitorData) {
    
    var monitorBusiness = {};
    
    monitorBusiness.getVendors = function(serviceType) {
        return monitorData.getVendors(serviceType);
    };
    
    monitorBusiness.getClients = function() {
        return monitorData.getClients();
    };
    
    monitorBusiness.getRequests = function(serviceType) {
        return monitorData.getRequests(serviceType);
    };
    
    monitorBusiness.createNewMonitor = function(monitorInfo) {
        return monitorData.createNewMonitor(monitorInfo);
    };
    
    monitorBusiness.validateMonitorUser = function(email, pass) {
        return monitorData.validateMonitorUser(email, pass);
    };
    
    return monitorBusiness;
  });