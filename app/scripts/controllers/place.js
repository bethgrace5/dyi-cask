'use strict';

/**
 * @ngdoc function
 * @name dyiCaskApp.controller:LocationCtrl
 * @description
 * # LocationCtrl
 * Controller of the dyiCaskApp
 */
angular.module('dyiCaskApp')
  .controller('PlaceCtrl', function ($scope, $routeParams, $rootScope, $log, facebookService) {
    $rootScope.activeTab = '';
    $scope.id = $routeParams.id;
    $scope.place = {};

    // get a single place by the URL param id
    $scope.getPlace = function() {
      
      _.map($scope.item, function(place) {
        //$log.debug(item);
        //if (item.place_id === $scope.id) {
          //$scope.place = item;
        //}
      });

      if ($rootScope.facebookIsReady && $scope.id) {
        facebookService.getPageInfoById($scope.id).then(
          function(success){ 
            $scope.place = success;
          },
          function(failure) {
            //$log.debug(failure);
        });
      }
    }

    // the user is looking at a specific place
    if($scope.id) {
      if ($rootScope.facebookIsReady) {
        $scope.getPlace();
      }
    }
    // the user is looking at a list of places
    else {
      $rootScope.activeTab = '/place';
    }

    $scope.$on('fb-init', function(event, args) {
      $scope.getPlace();
    });

  });
