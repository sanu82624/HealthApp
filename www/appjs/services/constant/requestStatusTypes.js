'use strict';

angular.module('cmaManagementApp')
  .constant('requestStatusTypes', {
      
    WIP: "WIP",
    ERROR: "ERROR",
    DECLINED: "DECLINED",
    CLOSED: "CLOSED",
    NONE: "NONE"
  });
