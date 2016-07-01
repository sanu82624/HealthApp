'use strict';

angular.module('cmaManagementApp')
  .constant('ticketStatusTypes', {
      
    ASSIGNED: "ASSIGNED",
    ACCEPTED: "ACCEPTED",
    DECLINED: "DECLINED",
    CLOSED: "CLOSED"
  });
