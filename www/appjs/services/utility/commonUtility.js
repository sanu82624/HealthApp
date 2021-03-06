'use strict';

angular.module('cmaManagementApp')
    .factory('commonUtility', function (serviceLoader, constantLoader) {
	
	var commonUtility = {};
	
	commonUtility.redirectTo = function(route){
            serviceLoader.location.url("/" + route);
	};
        
        commonUtility.showAlert = function(message, alertType){
            if(!commonUtility.is3DValidKey(alertType)){
                alertType = constantLoader.alertTypes.Danger;
            }
            commonUtility.setRootScopeProperty(
                constantLoader.rootScopeTypes.IS_SHOW_ALERT, false);
            commonUtility.setRootScopeProperty(
                constantLoader.rootScopeTypes.ALERT_TYPE, alertType);
            commonUtility.setRootScopeProperty(
                constantLoader.rootScopeTypes.ALERT_MSG, message);
        
            serviceLoader.timeout(function () {
                commonUtility.closeAlert();
            }, (constantLoader.defaultValues.ALERT_OFF_IN_SEC * 1000));
	};
        
        commonUtility.closeAlert = function(){
            commonUtility.setRootScopeProperty(
                constantLoader.rootScopeTypes.IS_SHOW_ALERT, true);
        };
        
        commonUtility.is3DValidKey = function(value){
            return (angular.isDefined(value) && value !== 
                constantLoader.defaultValues.BLANK_STRING && value !== null);
        };
        
        commonUtility.getRelativeUrl = function(relativeUrl, isTimeStamp){
            if(commonUtility.is3DValidKey(isTimeStamp) && isTimeStamp){
                var now = moment();
                relativeUrl = relativeUrl + 
                    ((relativeUrl.indexOf('?') > -1) ? "&" : "?") + "tm=" + now;
            }
            return relativeUrl;
        };
        
        commonUtility.getDateFromString = function(value){
            var dateValue = "";
            if(!commonUtility.is3DValidKey(value)){
                return dateValue;
            }
            var values = value.split(".");
            if(values.length > 6){
                dateValue = moment((values[2] + "-" + values[1] +  "-" + values[0] +  " " +
                    values[3] + ":" + values[4]), 
                    "YYYY-MM-DD HH:mm").format(constantLoader.defaultValues.SHOW_DATE_FORMAT);
            }
            return dateValue;
        };
        
        commonUtility.getFilterArray = function(array, filterJson){
            return serviceLoader.filter("filter")(array, filterJson);
        };
        
        commonUtility.getCustomSortedList = function(array, endedlist, fieldToSearch, fieldToSort){
            var endedArray = endedlist.split(",");
            var endedItems = [];
            for(var index=0; index<endedArray.length; index++){
                endedItems.push(serviceLoader.filter("filter")(array,
                    function(item){return (item[fieldToSearch] === endedArray[index]);}));
            }
            
            var result = serviceLoader.filter("orderBy")(array, fieldToSort);
            for(var index=0; index<endedArray.length; index++){
                result = serviceLoader.filter("filter")(result, 
                    function(item){return (item[fieldToSearch] !== endedArray[index]);});
            }
            
            for(var index=endedItems.length-1; index>=0; index--){
                result.unshift(endedItems[index][0]);
            }
            return result;
        };
        
        commonUtility.randomString = function() {
            var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
            var string_length = 8;
            var randomstring = '';
            for (var i=0; i<string_length; i++) {
                var rnum = Math.floor(Math.random() * chars.length);
                randomstring += chars.substring(rnum,rnum+1);
            }
            return randomstring;
        };
        
        commonUtility.setRootScopeProperty = function(propertyName, value){
            serviceLoader.rootScope[propertyName] = value;
        };
    
        commonUtility.getRootScopeProperty = function(propertyName){
            return serviceLoader.rootScope[propertyName];
        };
        
        commonUtility.deleteRootScopeProperty = function(propertyName){
            delete serviceLoader.rootScope[propertyName];
        };
        
        commonUtility.deleteAllRootScopeProperty = function(){
            for (var prop in serviceLoader.rootScope) {
                if (prop.substring(0,1) !== "$" && prop !== 
                    constantLoader.rootScopeTypes.IS_SHOW_ALERT){
                    if (prop.substring(0,3) !== "IS_"){
                        commonUtility.setRootScopeProperty(prop, false);
                    }else{
                        commonUtility.deleteRootScopeProperty(prop);
                    }
                }
            }
        };
        
        commonUtility.getSplitArray = function(value, separator){
            var result = [];
            if(!commonUtility.is3DValidKey(value)){
                return result;
            }
            result = value.split(separator);
            return result;
        };
        
        commonUtility.getJsonFromString = function(value){
            return window.JSON.parse(value);
        };
	
	return commonUtility;
  });