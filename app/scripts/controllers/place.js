'use strict';

/**
 * @ngdoc function
 * @name dyiCaskApp.controller:LocationCtrl
 * @description
 * # LocationCtrl
 * Controller of the dyiCaskApp
 */
angular.module('dyiCaskApp')
  .controller('PlaceCtrl', function ($scope, $routeParams, $rootScope, $log) {
    $rootScope.activeTab = '';
    $scope.id = $routeParams.id;

    // the user is looking at a specific place
    if($scope.id) {
    }
    // the user is looking at a list of places
    else {
      $rootScope.activeTab = '/place';
    }

    $scope.array = [
    {"event": "Karaoke",
     "description": "People sing and you are one of the people!",
     "time":  "Thursday April 14th, 21:00"},
    {"event": "Paint Night",
     "description": "People paint paintings on each other!",
     "time": "Monday April 18th, 18:00"}
    ];

  });
