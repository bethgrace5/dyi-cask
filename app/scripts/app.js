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
    'facebook'
]).config(['$routeProvider', function($routeProvider) {
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
    .when('/location', {
      templateUrl: 'views/location.html',
      controller: 'LocationCtrl',
      controllerAs: 'location'
    })
    .otherwise({
      redirectTo: '/'
    });
}])
.config(['$facebookProvider', function($facebookProvider) {
  // Facebook setup
  $facebookProvider.init({
    appId: '584673925032739',
    channel: 'views/channel.html'
  });
}]);

