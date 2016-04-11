'use strict';

/**
 * @ngdoc function
 * @name dyiCaskApp.controller:LocationCtrl
 * @description
 * # LocationCtrl
 * Controller of the dyiCaskApp
 */
angular.module('dyiCaskApp')
  .controller('PlaceCtrl', function ($scope, $routeParams, $rootScope, $log, facebookService, $location) {
    $rootScope.activeTab = '';
    $scope.id = parseInt($routeParams.id);
    $scope.thisPlace = {};

    $scope.getDate = function(d) {
      return moment(d).format("dddd, MMMM Do YYYY, h:mm a");
    }

    $scope.selectPlace = function() {
      $scope.place = _.map($scope.places, function(p) {
        if (parseInt(p.place_id) === $scope.id){
          $scope.thisPlace = p;
          return p;
        }
      });
      if (_.isEmpty($scope.thisPlace)) {
        if ($routeParams.id) {
          $location.path( "/place" );
        }
      }
      else {
      }
    }

    $scope.selectPlace();


    // the user is looking at a specific place
    if($scope.id) {
    }
    // the user is looking at a list of places
    else {
      $rootScope.activeTab = '/place';
    }

    $scope.$on('fb-init', function(event, args) {
    });

  });
