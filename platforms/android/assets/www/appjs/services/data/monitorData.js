
angular.module('cmaManagementApp')
  .factory('monitorData', function (dataLayer, relativeUrls) {
    
    var monitorData = {};
    
    monitorData.getVendors = function(serviceType) {
        
        return dataLayer.getAsync(relativeUrls.MONITOR_ALL_VENDORS + serviceType);
    };
	
	return monitorData;
  });
