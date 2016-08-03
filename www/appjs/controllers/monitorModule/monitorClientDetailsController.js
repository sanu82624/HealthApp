'use strict';

angular.module('cmaManagementApp').controller('monitorClientDetailsController',
    function(commonUtility, userBusiness, constantLoader, serviceLoader){

        var vm = this;

        vm.client = {};
        vm.totalReqCount = 0;
        vm.inProcReqCount = 0;
        vm.closedReqCount = 0;
        var genderList = commonUtility.getJsonFromString(constantLoader.defaultValues.GENDER);

        function initialize(){
            loadClientDetails();
            loadRequests();
        }
        
        function loadClientDetails(){
            if(commonUtility.is3DValidKey(commonUtility.getRootScopeProperty(
                constantLoader.rootScopeTypes.ASSOCIATE_ID))){
                userBusiness.loadUserInfo(commonUtility.getRootScopeProperty(
                    constantLoader.rootScopeTypes.ASSOCIATE_ID)).then(function(response){
                    if(response.data.success){
                        vm.client = response.data.result;
                        var genders = commonUtility.getFilterArray(genderList, {code: vm.client.gender});
                        if(genders.length > 0){
                            vm.client.gender = genders[0].name;
                        }
                    }else{
                        commonUtility.showAlert(response.data.statusText);
                    }
                }, function(error){
                    commonUtility.showAlert(error.data.statusText);
                });
            }
        }
        
        function loadRequests(){
            if(commonUtility.is3DValidKey(commonUtility.getRootScopeProperty(
                constantLoader.rootScopeTypes.ASSOCIATE_ID))){
                userBusiness.loadMyRequests(commonUtility.getRootScopeProperty(
                    constantLoader.rootScopeTypes.ASSOCIATE_ID)).then(function(response){
                    if(response.data.success){
                        vm.inProcReqCount = (serviceLoader.filter('filter')(response.data.result, 
                            userBusiness.getInProcFilteredRequests)).length;
                        vm.closedReqCount = (serviceLoader.filter('filter')(response.data.result, 
                            {status: constantLoader.requestStatusTypes.CLOSED})).length;
                        vm.totalReqCount = response.data.result.length;
                    }else{
                        commonUtility.showAlert(response.data.statusText);
                    }
                }, function(error){
                    commonUtility.showAlert(error.data.statusText);
                });
            }
        }
        
        vm.onBackClick = function(){
            commonUtility.redirectTo(constantLoader.routeTypes.MONITOR_ALL_CLIENT);
        };
        
        initialize();
    });