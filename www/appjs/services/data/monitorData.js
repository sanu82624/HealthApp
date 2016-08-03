
angular.module('cmaManagementApp')
  .factory('monitorData', function (dataLayer, constantLoader, commonUtility) {
    
    var monitorData = {};
    
    monitorData.getVendors = function(serviceType) {
        return dataLayer.getAsync(commonUtility.getRelativeUrl(
            constantLoader.relativeUrls.MONITOR_ALL_VENDORS) + serviceType);
    };
    
    monitorData.getClients = function() {
        return dataLayer.getAsync(commonUtility.getRelativeUrl(
            constantLoader.relativeUrls.MONITOR_ALL_CLIENTS));
    };
    
    monitorData.getRequests = function(serviceType) {
        return dataLayer.getAsync(commonUtility.getRelativeUrl(
            constantLoader.relativeUrls.MONITOR_ALL_REQUESTS) + serviceType);
    };
    
    monitorData.createNewMonitor = function(monitorInfo) {
        return dataLayer.postAsync(
            commonUtility.getRelativeUrl(
            constantLoader.relativeUrls.MONITOR_REG), monitorInfo);
    };
    
    monitorData.validateMonitorUser = function(email, pass) {
        return dataLayer.postAsync(commonUtility.getRelativeUrl(
            constantLoader.relativeUrls.MONITOR_LOGIN + 
            "?email="+email+"&password="+pass), null, 
            constantLoader.headerTypes.CONTENT_ONLY);
    };
    
    return monitorData;
  });
