'use strict';	

angular.module('cmaManagementApp')
    .constant('defaultValues', {
      
        SERVICE_URL: "http://healthappwsv0.mybluemix.net/",
        REQUEST_CHANNEL: "MOBILE",
        BLANK_STRING: "",
        COMBO_SELECT_MSG: "Please select",
        BLANK_ISD_CODE: "",
        ISD_SEPARATOR: "-|",
        COUNTRY_ENDED_LIST: "IN,US,GB",
        COUNTRY_SEARCH_FIELD: "isoCode",
        COUNTRY_SORT_FIELD: "name",
        PHONE_TYPE_DEFAULT: "Phone",
        MOBILE_TYPE_DEFAULT: "Mobile",
        RELOGIN_AGAIN: "\nRelogin again.",
        GENDER: "[{\"code\": \"M\",\"name\": \"Male\"},{\"code\": \"F\",\"name\": \"Female\"}]",
        ACTIVE: "Active",
        INACTIVE: "Inactive",
        BADGE_COLOR_ACTIVE: "green",
        BADGE_COLOR_INACTIVE: "red",
        SHOW_DATE_FORMAT: "DD-MMM-YYYY hh:mm A",
        ALERT_OFF_IN_SEC: 2,
        REQ_STATUSES: "[{\"code\": \"ERROR\", \"color\": \"danger\"}," +
                       "{\"code\": \"WIP\", \"color\": \"success\"}]"
  });
