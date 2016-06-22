'use strict';

angular.module('cmaManagementApp')
  .constant('messages', {
      
      CREATE_REQUEST_SUCCESS: "Request created successfully",
	  CREATE_REQUEST_ERROR: "Request could not be created",
	  VALID_EMAIL: "Enter valid email!",
	  VALID_PASS: "Enter valid password!",
	  VALID_USER_TYPE: "Select valid type!",
	  USER_REG_SUCCESS: "Registration is successfully done.",
	  USER_REG_FAIL: "Registration is failed.",
	  USER_LOGIN_FAIL: "Login failed.",
	  USER_LOGIN_WRONG: "Wrong credentials."
  });