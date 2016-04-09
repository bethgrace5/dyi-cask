'use strict';

/**
 * @ngdoc function
 * @name dyiCaskApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dyiCaskApp
 */
angular.module('dyiCaskApp')
  .controller('MainCtrl', function (
    $facebook,
    $log,
    $scope) {

    // bind directly to the response promise
    $scope.loginStatus = $facebook.getLoginStatus();
    //$log.debug($scope.loginStatus);

    // use the promise in code
    $facebook.getLoginStatus().then(
      function(response) {
        $scope.loginResponse = response;
        $log.debug(response);
      },
      function(response) {
        $scope.loginError = response.error;
        $log.debug(response);
      });


  });
