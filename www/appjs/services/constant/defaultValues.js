'use strict';	

angular.module('cmaManagementApp')
    .constant('defaultValues', {
      
        SERVICE_URL: "http://healthappwsv0.mybluemix.net/",
        REQUEST_CHANNEL: "MOBILE",
        BLANK_STRING: "",
        COMBO_SELECT_MSG: "Please select",
        BLANK_ISD_CODE: "+00",
        ISD_SEPARATOR: "-|"
  });
