'use strict';

angular.module('cmaManagementApp')
    .factory('constantLoader', function (defaultValues, headerTypes, messages,
        relativeUrls, ticketStatusTypes, validationPattern, rootScopeTypes,
        routeTypes, controlSuggestions, alertTypes, userTypes, storageTypes, 
        requestStatusTypes) {
          
        var constantLoader = {};
  
        constantLoader.defaultValues = defaultValues;
        constantLoader.headerTypes = headerTypes;
        constantLoader.messages = messages;
        constantLoader.relativeUrls = relativeUrls;
        constantLoader.relativeUrls = relativeUrls;
        constantLoader.ticketStatusTypes = ticketStatusTypes;
        constantLoader.validationPattern = validationPattern;
        constantLoader.rootScopeTypes = rootScopeTypes;
        constantLoader.routeTypes = routeTypes;
        constantLoader.controlSuggestions = controlSuggestions;
        constantLoader.alertTypes = alertTypes;
        constantLoader.userTypes = userTypes;
        constantLoader.requestStatusTypes = requestStatusTypes;
        constantLoader.storageTypes = storageTypes;
          
        return constantLoader;
    });