'use strict';

angular.module('cmaManagementApp')
  .factory('orchBusiness', function (orchData) {
    
    var orchBusiness = {};
    
    orchBusiness.validateOrch = function(email, pass) {
        return orchData.validateOrch(email, pass);
    };
    
    orchBusiness.registerOrch = function(request) {
        return orchData.registerOrch(request);
    };

    return orchBusiness;
  });