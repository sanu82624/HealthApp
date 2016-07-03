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
    USER_LOGIN_WRONG: "Wrong credentials.",
    VALID_NAME: "Enter valid name!",
    REQ_GENDER: "Select gender!",
    REQ_PIN: "Enter pin code!",
    REQ_COUNTRY: "Select country!",
    REQ_ADDRESS: "Enter address!",
    VALID_PHONE: "Enter valid phone!",
    REQ_SERVICE_TYPE: "Select service type!",
    PASS_MISMATCH: "New password and confirm password are mismatch!",
    ALREADY_ADDED: "You have already added!",
    TRY_AGAIN: "Try again after some time!",
    BLANK_VALUE: "Blank will not going to be added!",
    COUNTRY_CODE: "Please select country code!"
  });