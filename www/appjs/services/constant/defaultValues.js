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
        PHONE_TYPE_DEFAULT: "P"
  });
