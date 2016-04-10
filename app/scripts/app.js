'use strict';

/**
 * @ngdoc overview
 * @name dyiCaskApp
 * @description
 * # dyiCaskApp
 *
 * Main module of the application.
 */

angular.module('dyiCaskApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'LocalStorageModule'
])

.config(['$routeProvider', '$logProvider', 'localStorageServiceProvider',
  function($routeProvider, $logProvider, localStorageServiceProvider) {
  // Routes
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl',
      controllerAs: 'main'
    })
    .when('/about', {
      templateUrl: 'views/about.html',
      controller: 'AboutCtrl',
      controllerAs: 'about'
    })
    .when('/listLocations', {
      templateUrl: 'views/locations.html',
      controller: 'LocationsCtrl',
      controllerAs: 'locations'
    })
    .when('/listEvents', {
      templateUrl: 'views/events.html',
      controller: 'EventsCtrl',
      controllerAs: 'events'
    })
    .when('/event', {
      templateUrl: 'views/event.html',
      controller: 'EventCtrl',
      controllerAs: 'event'
    })
    .when('/location/:test', {
      templateUrl: 'views/location.html',
      controller: 'LocationCtrl',
      controllerAs: 'location'
    })
    .otherwise({
      redirectTo: '/'
    });

  // Logging
  $logProvider.debugEnabled(true);

  // local storage
  localStorageServiceProvider
    .setPrefix('cask')
    .setStorageType('localStorage')
    .setNotify(true, true)
}])

.run(['$rootScope', '$window', 'localStorageService', function($rootScope, $window, localStorageService) {

  $rootScope.user = {};

  $window.fbAsyncInit = function() {

    FB.init({ 
      appId: '584673925032739',
      channelUrl: 'app/channel.html',
      status: true, 
      cookie: true, 
      xfbml: true,
      version: 'v2.4'
    });

    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        localStorageService.set('fb_token', response.authResponse.accessToken);
        //console.log(localStorageService.get('fb_token'));
      }
    });

    $rootScope.$broadcast('fb-init');
  };
}]);

(function(d){
    // load the Facebook javascript SDK

    var js, 
    id = 'facebook-jssdk', 
    ref = d.getElementsByTagName('script')[0];

    if (d.getElementById(id)) {
      return;
    }

    js = d.createElement('script'); 
    js.id = id; 
    js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";

    ref.parentNode.insertBefore(js, ref);

  }(document));



