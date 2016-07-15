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
                templateUrl: 'views/user/userlanding.html',
                controller: 'userHomeController as vm'
            }).
            when('/newReq',{
                templateUrl: 'views/user/userNewRequest.html',
                controller: 'userRequestController as vm'
            }).
            when('/myReq',{
                templateUrl: 'views/user/userMyRequest.html',
                controller: 'userRequestController as vm'
            }).
            when('/reg',{
                templateUrl: 'views/user/userRegistration.html',
                controller: 'userRegistrationController as vm'
            }).
            when('/login',{
                templateUrl: 'views/user/userLogin.html',
                controller: 'userLoginController as vm'
            }).
            when('/userProfile',{
                templateUrl: 'views/user/userProfile.html',
                controller: 'userProfileController as vm'
            }).
            when('/userMH',{
                templateUrl: 'views/user/userMedicalHistory.html',
                controller: 'userMedHisController as vm'
            }).
            when('/userAllergic',{
                templateUrl: 'views/user/userAllergic.html',
                controller: 'userAllergicController as vm'
            }).
            when('/userEmail',{
                templateUrl: 'views/user/userEmails.html',
                controller: 'userEmailsController as vm'
            }).
            when('/userPass',{
                templateUrl: 'views/user/userChangePass.html',
                controller: 'userChangePassController as vm'
            }).
            when('/userInfo',{
                templateUrl: 'views/user/userInfoEdit.html',
                controller: 'userInfoController as vm'
            }).
            when('/userEPhone',{
                templateUrl: 'views/user/userEPhone.html',
                controller: 'userEPhoneController as vm'
            }).
            when('/serviceManagementHome',
            {
                templateUrl: 'views/serviceManagementLanding.html',
                controller: 'serviceManagementController'
            }).
            when('/groundVendorHome',{
                templateUrl: 'views/vendor/vendorLanding.html',
                controller: 'vendorLandingController as vm'
            }).
            when('/vendorLogin',{
                templateUrl: 'views/vendor/vendorLogin.html',
                controller: 'vendorLoginController as vm'
            }).
            when('/vendorReg',{
                templateUrl: 'views/vendor/vendorRegistration.html',
                controller: 'vendorRegistrationController as vm'
            }).
            when('/vendorAllReq',{
                templateUrl: 'views/vendor/vendorAllRequest.html',
                controller: 'vendorRequestController as vm'
            }).
            when('/vendorRaisedReq',{
                templateUrl: 'views/vendor/vendorRaisedRequest.html',
                controller: 'vendorRequestController as vm'
            }).
            when('/vendorRespondedReq',{
                templateUrl: 'views/vendor/vendorRespondedRequest.html',
                controller: 'vendorRespondedRequestController as vm'
            }).
            when('/vendorProfile',{
                templateUrl: 'views/vendor/vendorProfile.html',
                controller: 'vendorProfileController as vm'
            }).
            when('/vendorInfo',{
                templateUrl: 'views/vendor/vendorInfoEdit.html',
                controller: 'vendorInfoEditController as vm'
            }).
            when('/vendorPass',{
                templateUrl: 'views/vendor/vendorPass.html',
                controller: 'vendorPassController as vm'
            }).
            when('/vendorEmails',{
                templateUrl: 'views/vendor/vendorEmails.html',
                controller: 'vendorEmailsController as vm'
            }).
            when('/vendorPhones',{
                templateUrl: 'views/vendor/vendorPhones.html',
                controller: 'vendorPhonesController as vm'
            }).
            when('/vendorLocs',{
                templateUrl: 'views/vendor/vendorLocs.html',
                controller: 'vendorLocsController as vm'
            }).
            when('/vendorLocView',{
                templateUrl: 'views/vendor/vendorLocView.html',
                controller: 'vendorLocViewController as vm'
            }).
            when('/vendorLocEdit',{
                templateUrl: 'views/vendor/vendorLocEdit.html',
                controller: 'vendorLocController as vm'
            }).
            when('/monitoringGroupHome',{
                templateUrl: 'views/monitor/monitoringGroupLanding.html',
                controller: 'monitoringGroupController as vm'
            }).
            when('/monitorAllVendor',{
                templateUrl: 'views/monitor/monitorAllVendor.html',
                controller: 'monitorAllVendorController as vm'
            }).
            when('/monitorVendorDetails',{
                templateUrl: 'views/monitor/VendorDetails.html',
                controller: 'monitorVendorDetailsController as vm'
            }).
            otherwise({
                redirectTo : '/appHome'
            });
}]);