
angular.module('cmaManagementApp')
  .service('dataLayer', function ($http, defaultValues) {
    
    this.getAsync = function(relativeUrl){
        
        var urlString = "";
        urlString = buildUrl(relativeUrl);
        return $http({
                        method: 'GET', 
                        url: urlString,
                        headers: generateConfig()
                    });
    };
    
    this.postAsync = function(relativeUrl, postData){
        
        var urlString = buildUrl(relativeUrl);
        
        var httpPromise = null;
        var requestObj = {};
        requestObj = {
                        method: 'POST', 
                        url: urlString,
                        data: postData,
                        headers: generateConfig()
                    };
        httpPromise = $http(requestObj);
        return httpPromise;
    };
	
	this.postWithUrlAsync = function(relativeUrl){
        
        var urlString = buildUrl(relativeUrl);
        
        var httpPromise = null;
        var requestObj = {};
        requestObj = {
                        method: 'POST', 
                        url: urlString,
						headers: {"content-type": "application/json"}
                    };
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
                        headers: generateConfig()
                    };
        httpPromise = $http(requestObj);
        return httpPromise;
    };
    
    this.deleteAsync = function(relativeUrl){
        
        var url = buildUrl(relativeUrl);
        return $http.delete(url, generateConfig());
    };
    
    function buildUrl(relativeUrl){
        
        return defaultValues.SERVICE_URL + relativeUrl;
    }
    
    function generateConfig() {
        
        return {
            "authorization": "Basic testAuth",
            "content-type": "application/json"
        };
    }   
});
