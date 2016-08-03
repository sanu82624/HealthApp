'use strict';

angular.module('cmaManagementApp')
    .constant('relativeUrls', {
      
        CREATE_REQUEST: "customer/service/serviceRequest",
        MY_REQUEST: "customer/service/serviceRequest/",
        USER_LOGIN_VALIDATE: "customer/service/validate",
        USER_REG: "customer/service/register",
        USER_PASS_CHANGE: "customer/service/updateClientPassword",
        USER_INFO: "customer/service/client/",
        USER_INFO_UPDATE: "customer/service/client",

        VENDOR_REG: "vendor/service/vendor/register",
        VENDOR_LOGIN_VALIDATE: "vendor/service/vendor/validate",
        VENDOR_ASSIGNED_REQUEST: "vendor/service/requests/byvendor/",
        VENDOR_DETAILS: "vendor/service/vendor/",
        VENDOR_TICKET_STATUS_CHANGED: "vendor/service/requests/changestatus",
        VENDOR_DETAILS_BY_ID: "vendor/service/vendor/",
        VENDOR_UPDATE: "vendor/service/vendor",
        VENDOR_PASS_CHANGE: "vendor/service/updatePassword",
        VENDOR_CHILD: "vendor/service/child/",
        VENDOR_ASSN: "vendor/service/request/details/",

        MONITOR_ALL_VENDORS: "vendor/service/vendors/",
        MONITOR_ALL_REQUESTS: "vendor/service/requests/assigned/all/",
        MONITOR_REG: "monitorgrp/service/monitorgrp/register",
        MONITOR_LOGIN: "monitorgrp/service/monitorgrp/validate",
        
        SERVICE_TYPE: "refdata/service/serviceTypes",
        COUNTRY: "refdata/service/countryList"
  });