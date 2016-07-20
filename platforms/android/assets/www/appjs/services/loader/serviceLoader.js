'use strict';

angular.module('cmaManagementApp')
    .service('serviceLoader', function ($location, $filter, $rootScope, $http,
        $timeout) {
        
        var serviceLoader = {};
        
        var _location = null;
//        var _translate = null;
//        var _window = null;
        var _filter = null;
//        var _log = null;
        var _http = null;
//        var _sanitize = null;
        var _rootScope = null;
//        var _route = null;
        var _timeout = null;
        
        function setProperty(instance, service){
            if(instance === null){
                instance = service;
                return instance;
            }
            return instance;
        }
        
        Object.defineProperty(serviceLoader, "location", {
            get: function() {
                return setProperty(_location, $location);
            }
        });
//        
//        Object.defineProperty(serviceLoader, "translate", {
//            get: function() {
//                return setProperty(_translate, $translate);
//            }
//        });
        
        Object.defineProperty(serviceLoader, "filter", {
            get: function() {
                return setProperty(_filter, $filter);
            }
        });
        
//        Object.defineProperty(serviceLoader, "window", {
//            get: function() {
//                return setProperty(_window, $window);
//            }
//        });
//        
//        Object.defineProperty(serviceLoader, "log", {
//            get: function() {
//                return setProperty(_log, $log);
//            }
//        });
//        
        Object.defineProperty(serviceLoader, "http", {
            get: function() {
                return setProperty(_http, $http);
            }
        });
//        
//        Object.defineProperty(serviceLoader, "sanitize", {
//            get: function() {
//                return setProperty(_sanitize, $sanitize);
//            }
//        });
//
        Object.defineProperty(serviceLoader, "rootScope", {
            get: function() {
                return setProperty(_rootScope, $rootScope);
            }
        });
//        
//        Object.defineProperty(serviceLoader, "route", {
//            get: function() {
//                return setProperty(_route, $route);
//            }
//        });
//        
        Object.defineProperty(serviceLoader, "timeout", {
            get: function() {
                return setProperty(_timeout, $timeout);
            }
        });
        
        return serviceLoader;
    });
