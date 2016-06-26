'use strict';

angular.module('cmaManagementApp').controller('userRequestController',[
    'commonUtility', 'defaultValues', 'userBusiness', 'messages', '$rootScope',
    function(commonUtility, defaultValues, userBusiness, messages, $rootScope){
		
        var vm = this;
        vm.myRequests = [];

        vm.serviceTypes = $rootScope.serviceTypes;

        vm.onBacktoUserHome = function(){
            commonUtility.redirectTo("userLanding");
        };
		
        vm.createNewRequest = function(serviceType){
            var request = {};
            request.requestType = serviceType;
            request.latitude = 0;
            request.longitude = 0;
            request.clientId = $rootScope.ClientId;
            request.channel = defaultValues.REQUEST_CHANNEL;

            userBusiness.createNewRequest(request).then(function(response){
                if(response.data.success){
                    window.alert(messages.CREATE_REQUEST_SUCCESS);
                    commonUtility.redirectTo("userLanding");
                } else{
                    window.alert(messages.CREATE_REQUEST_ERROR);
                }
            }, function(error){
                window.alert(messages.CREATE_REQUEST_ERROR);
            });
        };
		
        vm.onLoadMyRequests = function(){
            userBusiness.loadMyRequests($rootScope.ClientId).then(function(response){
                vm.myRequests = response.data.result;
                console.info(vm.myRequests);
            }, function(error){
                console.info(error);
            });
        };
    }
]);