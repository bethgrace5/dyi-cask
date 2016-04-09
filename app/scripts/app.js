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
    'ngTouch'
])

.config(['$routeProvider', '$logProvider',
  function($routeProvider, $logProvider) {
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
    .otherwise({
      redirectTo: '/'
    });

  // Logging
  $logProvider.debugEnabled(true);

}])

.run(['$rootScope', '$window', function($rootScope, $window) {

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

    $rootScope.$broadcast('fb-init');
  };
}])

.factory('facebookService', function($q) {
    return {
        getMyLastName: function() {

            var deferred = $q.defer();

            FB.api('/me', {
                fields: 'last_name'
            }, function(response) {
                if (!response || response.error) {
                    deferred.reject('Error occured');
                } else {
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        }
    }
  });

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



