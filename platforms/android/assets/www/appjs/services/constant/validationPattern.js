'use strict';

angular.module('cmaManagementApp')
  .constant('validationPattern', {
      
      EMAIL: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
	  NAME: /^[A-Za-z-'.\s]+$/,
	  PHONE: /^[- +()]*[0-9][- +()0-9]*$/
  });