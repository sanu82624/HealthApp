'use strict';

angular.module('cmaManagementApp').controller('vendorLocsController',
    function(constantLoader, vendorBusiness, commonUtility){
        
        var vm = this;
        
        function initialized(){
            loadLocations();
        }
        
        function loadLocations(){
            
        }
        
        vm.onAddLocClick = function(){
            commonUtility.redirectTo("vendorLocEdit");
        };
        
        vm.onCancelClick = function(){
            commonUtility.redirectTo("vendorProfile");
        };
        
        initialized();
    });

