'use strict';

angular.module('cmaManagementApp')
    .factory('constantLoader', function (defaultValues, headerTypes, messages,
        relativeUrls, ticketStatusTypes, validationPattern) {
          
        var constantLoader = {};
  
        constantLoader.defaultValues = defaultValues;
        constantLoader.headerTypes = headerTypes;
        constantLoader.messages = messages;
        constantLoader.relativeUrls = relativeUrls;
        constantLoader.relativeUrls = relativeUrls;
        constantLoader.ticketStatusTypes = ticketStatusTypes;
        constantLoader.validationPattern = validationPattern;
          
        return constantLoader;
    });