
angular.module('cmaManagementApp')
  .factory('monitorData', function (dataLayer, constantLoader) {
    
    var monitorData = {};
    
    monitorData.getVendors = function(serviceType) {
        
        return dataLayer.getAsync(constantLoader.relativeUrls.MONITOR_ALL_VENDORS + serviceType);
    };
	
	return monitorData;
  });
