'use strict';

angular.module('cmaManagementApp').controller('userRequestController',
    function(commonUtility, userBusiness, constantLoader, $rootScope,
    generalUtility){
		
        var vm = this;
        vm.myRequests = [];

        vm.serviceTypes = [];
        
        function initialized(){
            loadServiceTypes();
        }
        
        function loadServiceTypes(){
            generalUtility.loadServiceType().then(function(response){
                if(response.data.success){
                    if(response.data.result !== null){
                        angular.forEach(response.data.result, function(value, key) {
                            vm.serviceTypes.push({
                                code: key,
                                name: value
                            });
                        });
                    }
                } else{
                    commonUtility.showAlert(response.data.statusText);
                }
            }, function(error){
                
            });
        }

        vm.onBacktoUserHome = function(){
            commonUtility.redirectTo("userLanding");
        };
		
        vm.createNewRequest = function(serviceType){
            var request = {};
            request.requestType = serviceType;
            request.clientId = $rootScope.ID;
            request.channel = constantLoader.defaultValues.REQUEST_CHANNEL;

            userBusiness.createNewRequest(request).then(function(response){
                if(response.data.success){
                    commonUtility.showAlert(constantLoader.messages.CREATE_REQUEST_SUCCESS);
                    commonUtility.redirectTo("userLanding");
                } else{
                    commonUtility.showAlert(constantLoader.messages.CREATE_REQUEST_ERROR);
                }
            }, function(error){
                commonUtility.showAlert(constantLoader.messages.CREATE_REQUEST_ERROR);
            });
        };
		
        vm.onLoadMyRequests = function(){
            userBusiness.loadMyRequests($rootScope.ID).then(function(response){
                vm.myRequests = response.data.result;
            }, function(error){
                console.log(error.data);
            });
        };
        
        initialized();
    }
);