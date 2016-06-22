'use strict';

angular.module('routerConfigModule', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider){
	$routeProvider.
            when('/userLanding',
            {
                templateUrl: 'views/userlanding.html',
                controller: 'userHomeController as vm'
            }).
            when('/serviceManagementHome',
            {
                templateUrl: 'views/serviceManagementLanding.html',
                controller: 'serviceManagementController'
            }).
            when('/groundVendorHome',{
                templateUrl: 'views/groundVendorLanding.html',
                controller: 'vendorRequestController as vm'
            }).
			when('/vendorRaisedReq',{
					templateUrl: 'views/vendorRaisedRequest.html',
					controller: 'groundVendorController as vm'
			}).
			when('/monitoringGroupHome',{
					templateUrl: 'views/monitoringGroupLanding.html',
					controller: 'monitoringGroupController as vm'
			}).
			when('/appHome',{
					templateUrl	: 'views/appHome.html',
					controller: 'appHomeController as vm'
			}).
			when('/newReq',{
					templateUrl	: 'views/userNewRequest.html',
					controller: 'userRequestController as vm'
			}).
			when('/myReq',{
					templateUrl	: 'views/userMyRequest.html',
					controller: 'userRequestController as vm'
			}).
			when('/reg',{
					templateUrl	: 'views/userRegistration.html',
					controller: 'userRegistrationController as vm'
			}).
			when('/login',{
					templateUrl	: 'views/userLogin.html',
					controller: 'userLoginController as vm'
			}).
			when('/userProfile',{
					templateUrl	: 'views/userProfile.html',
					controller: 'userProfileController as vm'
			}).
			when('/userMH',{
					templateUrl	: 'views/userMedicalHistory.html',
					controller: 'userProfileController as vm'
			}).
			when('/vendorLogin',{
					templateUrl	: 'views/groundVendorLogin.html',
					controller: 'groundVendorLoginController as vm'
			}).
			when('/vendorReg',{
					templateUrl	: 'views/vendorRegistration.html',
					controller: 'vendorRegistrationController as vm'
			}).
			when('/vendorAllReq',{
					templateUrl	: 'views/vendorAllRequest.html',
					controller: 'vendorRequestController as vm'
			}).
			when('/monitorAllVendor',{
					templateUrl	: 'views/monitorAllVendor.html',
					controller: 'monitorAllVendorController as vm'
			}).
			when('/monitorVendorDetails',{
					templateUrl	: 'views/monitorVendorDetails.html',
					controller: 'monitorVendorDetailsController as vm'
			}).
			when('/vendorProfile',{
					templateUrl	: 'views/vendorProfile.html',
					controller: 'vendorProfileController as vm'
			}).
			otherwise({

				redirectTo : '/appHome'
			});
}]);