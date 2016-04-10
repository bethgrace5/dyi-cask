'use strict';

/**
 * @ngdoc function
 * @name dyiCaskApp.controller:LocationCtrl
 * @description
 * # LocationCtrl
 * Controller of the dyiCaskApp
 */
angular.module('dyiCaskApp')
  .controller('LocationCtrl', function ($scope, $routeParams) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.example = $routeParams.test;

    $scope.array = [
    {"event": "Karaoke",
     "description": "People sing and you are one of the people!",
     "time":  "Thursday April 14th, 21:00"},
    {"event": "Paint Night",
     "description": "People paint paintings on each other!",
     "time": "Monday April 18th, 18:00"}
    ];

  });
