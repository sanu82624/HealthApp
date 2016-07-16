'use strict';

angular.module('cmaManagementApp')
  .constant('routeTypes', {
    
    APP_HOME: "appHome",
    
    USER_PROFILE: "userProfile",
    USER_NEW_REQ: "newReq",
    USER_MY_REQ: "myReq",
    USER_LANDING: "userLanding",
    USER_LOGIN: "login",
    USER_REG: "reg",
    USER_MH: "userMH",
    USER_ALLERGY: "userAllergic",
    USER_EMAIL: "userEmail",
    USER_PHONE: "userEPhone",
    USER_PASS: "userPass",
    USER_INFO: "userInfo",
    
    VENDOR_LOGIN: "vendorLogin",
    VENDOR_HOME: "groundVendorHome",
    VENDOR_REG: "vendorReg",
    VENDOR_INFO: "vendorInfo",
    VENDOR_PROFILE: "vendorProfile",
    VENDOR_PASS: "vendorPass",
    VENDOR_EMAIL: "vendorEmails",
    VENDOR_PHONE: "vendorPhones",
    VENDOR_LOC: "vendorLocs",
    VENDOR_LOC_EDIT: "vendorLocEdit",
    VENDOR_LOC_VIEW: "vendorLocView",
    VENDOR_RAISED_REQ: "vendorRaisedReq",
    VENDOR_RESPONDED_REQ: "vendorRespondedReq"
  });