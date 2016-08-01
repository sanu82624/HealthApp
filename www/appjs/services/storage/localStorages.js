'use strict';

angular.module('cmaManagementApp')
  .factory('localStorages', function () {
    
    var storage = {};
    
    storage.get = function(key) {
        var item = localStorage.getItem(key);
        if(item){
            item = angular.fromJson(item);
            if(item === "null"){
                item = null;
            }
        }
        return item;
    };
    
    storage.set = function(key, obj) {
        var item = angular.toJson(obj);
        if(item){
            localStorage.setItem(key, item);
        }
    };
    
    storage.remove = function(key) {
        localStorage.removeItem(key);
    };
    
    storage.clear = function() {
        localStorage.clear();
    };
    
    Object.seal(storage);
    return storage;
  });
