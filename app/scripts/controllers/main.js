'use strict';

/**
 * @ngdoc function
 * @name dyiCaskApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dyiCaskApp
 */
angular.module('dyiCaskApp')
  .controller('MainCtrl', function (facebookService, $log, $scope) {

    $scope.$on('fb-init', function(event, args) 
    {
      facebookService.getMyLastName().then(
      function(response) 
      {
        $log.debug(JSON.stringify(response));
      },
      function(response) { 
        $log.debug(JSON.stringify(response));
      });
    });
    

  });
