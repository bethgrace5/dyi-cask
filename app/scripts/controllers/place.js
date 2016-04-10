'use strict';

/**
 * @ngdoc function
 * @name dyiCaskApp.controller:LocationCtrl
 * @description
 * # LocationCtrl
 * Controller of the dyiCaskApp
 */
angular.module('dyiCaskApp')
  .controller('PlaceCtrl', function ($scope, $routeParams) {
    $scope.id = $routeParams.id;

    $scope.array = [
    {"event": "Karaoke",
     "description": "People sing and you are one of the people!",
     "time":  "Thursday April 14th, 21:00"},
    {"event": "Paint Night",
     "description": "People paint paintings on each other!",
     "time": "Monday April 18th, 18:00"}
    ];

  });
