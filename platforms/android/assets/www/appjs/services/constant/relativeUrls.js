'use strict';

angular.module('cmaManagementApp')
  .constant('relativeUrls', {
      
      CREATE_REQUEST: "customer/service/serviceRequest",
	  MY_REQUEST: "customer/service/serviceRequest/",
	  USER_LOGIN_VALIDATE: "customer/service/validate",
	  USER_REG: "customer/service/register",
	  
	  VENDOR_REG: "vendor/service/vendor/register",
	  VENDOR_LOGIN_VALIDATE: "vendor/service/vendor/validate",
	  VENDOR_RAISED_REQUEST: "vendor/service/requests/assigned/all/",
	  VENDOR_DETAILS: "vendor/service/vendor/",
	  
	  MONITOR_ALL_VENDORS: "vendor/service/vendors/"
  });