
angular.module('cmaManagementApp')
  .service('dataLayer', function ($http, constantLoader) {
    
    this.getAsync = function(relativeUrl){
        
        var urlString = "";
        urlString = buildUrl(relativeUrl);
        return $http({
                        method: 'GET', 
                        url: urlString,
                        headers: generateConfig(constantLoader.headerTypes.GENERAL)
                    });
    };
    
    this.postAsync = function(relativeUrl, postData, headType){
        
        var urlString = buildUrl(relativeUrl);
        var header = generateConfig(constantLoader.headerTypes.GENERAL);
        if(angular.isDefined(headType) && headType !== null){
            header = generateConfig(headType);
        }
        var httpPromise = null;
        var requestObj = {};
        if(postData === null){
            requestObj = {
                method: 'POST', 
                url: urlString,
                headers: header
            };
        } else{
            requestObj = {
                method: 'POST', 
                url: urlString,
                data: postData,
                headers: header
            };
        }
        
        httpPromise = $http(requestObj);
        return httpPromise;
    };
    
    this.putAsync = function(relativeUrl, putData){
        
        var urlString = buildUrl(relativeUrl);
        var httpPromise = null;
        var requestObj = {};
        requestObj = {
                        method: 'PUT', 
                        url: urlString,
                        data: angular.toJson(putData),
                        headers: generateConfig(constantLoader.headerTypes.GENERAL)
                    };
        httpPromise = $http(requestObj);
        return httpPromise;
    };
    
    this.deleteAsync = function(relativeUrl){
        
        var url = buildUrl(relativeUrl);
        return $http.delete(url, generateConfig(constantLoader.headerTypes.GENERAL));
    };
    
    function buildUrl(relativeUrl){
        
        return constantLoader.defaultValues.SERVICE_URL + relativeUrl;
    }
    
    function generateConfig(type) {
        if(type === constantLoader.headerTypes.CONTENT_ONLY){
            return {
                "content-type": "application/json"
            };
        }else if(type === constantLoader.headerTypes.ENCODED_CONTENT){
            return {
                "authorization": "Basic testAuth",
                "Content-Type": "application/x-www-form-urlencoded"
            };
        }
        
        return {
            "authorization": "Basic testAuth",
            "content-type": "application/json"
        };
    }   
});