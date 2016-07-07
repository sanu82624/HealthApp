'use strict';

angular.module('cmaManagementApp').controller('vendorLocsController',
    function(constantLoader, vendorBusiness, commonUtility,
    $rootScope){
        
        var vm = this;
        
        function initialized(){
            loadLocations();
        }
        
        function loadLocations(){
            
        }
        
        vm.onAddLocClick = function(){
            commonUtility.redirectTo("vendorLocEdit");
        };
        
        initialized();
    });

