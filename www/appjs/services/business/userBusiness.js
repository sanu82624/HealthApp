'use strict';

angular.module('cmaManagementApp')
  .factory('userBusiness', function (userData) {
    
    var userBusiness = {};
    
    userBusiness.createNewRequest = function(request) {
        return userData.createNewRequest(request);
    };
	
    userBusiness.loadMyRequests = function(userId) {
        return userData.loadMyRequests(userId);
    };
	
    userBusiness.validateUser = function(email, pass) {
        return userData.validateUser(email, pass);
    };
	
    userBusiness.registerUser = function(request) {
        return userData.registerUser(request);
    };
    
    userBusiness.changeUserPAssword = function(email, currentPass, newPass) {
        return userData.changeUserPAssword(email, currentPass, newPass);
    };
    
    userBusiness.loadUserInfo = function(userId) {
        return userData.loadUserInfo(userId);
    };
    
    userBusiness.updateUserInfo = function(userInfo) {
        return userData.updateUserInfo(userInfo);
    };

    return userBusiness;
  });