'use strict';

angular.module('routerConfigModule', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider){
	$routeProvider.
            when('/appHome',{
                templateUrl: 'views/appHome.html',
                controller: 'appHomeController as vm'
            }).
            when('/userLanding',
            {
                templateUrl: 'views/userlanding.html',
                controller: 'userHomeController as vm'
            }).
            when('/newReq',{
                templateUrl: 'views/userNewRequest.html',
                controller: 'userRequestController as vm'
            }).
            when('/myReq',{
                templateUrl: 'views/userMyRequest.html',
                controller: 'userRequestController as vm'
            }).
            when('/reg',{
                templateUrl: 'views/userRegistration.html',
                controller: 'userRegistrationController as vm'
            }).
            when('/login',{
                templateUrl: 'views/userLogin.html',
                controller: 'userLoginController as vm'
            }).
            when('/userProfile',{
                templateUrl: 'views/userProfile.html',
                controller: 'userProfileController as vm'
            }).
            when('/userMH',{
                templateUrl: 'views/userMedicalHistory.html',
                controller: 'userMedHisController as vm'
            }).
            when('/userAllergic',{
                templateUrl: 'views/userAllergic.html',
                controller: 'userAllergicController as vm'
            }).
            when('/userEmail',{
                templateUrl: 'views/userEmails.html',
                controller: 'userEmailsController as vm'
            }).
            when('/userPass',{
                templateUrl: 'views/userChangePass.html',
                controller: 'userChangePassController as vm'
            }).
            when('/userInfo',{
                templateUrl: 'views/userInfoEdit.html',
                controller: 'userInfoController as vm'
            }).
            when('/serviceManagementHome',
            {
                templateUrl: 'views/serviceManagementLanding.html',
                controller: 'serviceManagementController'
            }).
            when('/groundVendorHome',{
                templateUrl: 'views/groundVendorLanding.html',
                controller: 'vendorLandingController as vm'
            }).
            when('/vendorLogin',{
                templateUrl: 'views/groundVendorLogin.html',
                controller: 'groundVendorLoginController as vm'
            }).
            when('/vendorReg',{
                templateUrl: 'views/vendorRegistration.html',
                controller: 'vendorRegistrationController as vm'
            }).
            when('/vendorAllReq',{
                templateUrl: 'views/vendorAllRequest.html',
                controller: 'vendorRequestController as vm'
            }).
            when('/vendorRaisedReq',{
                templateUrl: 'views/vendorRaisedRequest.html',
                controller: 'vendorRequestController as vm'
            }).
            when('/vendorProfile',{
                templateUrl: 'views/vendorProfile.html',
                controller: 'vendorProfileController as vm'
            }).
            when('/vendorInfo',{
                templateUrl: 'views/vendorInfoEdit.html',
                controller: 'vendorInfoEditController as vm'
            }).
            when('/vendorPass',{
                templateUrl: 'views/vendorPass.html',
                controller: 'vendorPassController as vm'
            }).
            when('/vendorEmails',{
                templateUrl: 'views/vendorEmails.html',
                controller: 'vendorEmailsController as vm'
            }).
            when('/vendorPhones',{
                templateUrl: 'views/vendorPhones.html',
                controller: 'vendorPhonesController as vm'
            }).
            when('/monitoringGroupHome',{
                templateUrl: 'views/monitoringGroupLanding.html',
                controller: 'monitoringGroupController as vm'
            }).
            when('/monitorAllVendor',{
                templateUrl: 'views/monitorAllVendor.html',
                controller: 'monitorAllVendorController as vm'
            }).
            when('/monitorVendorDetails',{
                templateUrl: 'views/monitorVendorDetails.html',
                controller: 'monitorVendorDetailsController as vm'
            }).
            otherwise({
                redirectTo : '/appHome'
            });
}]);