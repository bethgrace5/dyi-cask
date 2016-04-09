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

    $scope.locations = [
      {"name": "",
      "id": "410616265786425",
      "events": []},
      {"name": "",
      "id": "875835105860557",
      "events": []},
      {"name": "",
      "id": "941260815906419",
      "events": []},
      {"name": "",
      "id": "243499665673625",
      "events": []},
      {"name": "",
      "id": "356550797717326",
      "events": []},
      {"name": "",
      "id": "750619864976173",
      "events": []},
      {"name": "",
      "id": "96361922275",
      "events": []},
      {"name": "",
      "id": "302943546438648",
      "events": []}
      ];

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

    //$scope.locations


  });
