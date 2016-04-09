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
    $scope.example = $routeParams.name;

  });
