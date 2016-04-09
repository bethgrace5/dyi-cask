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

    $scope.$on('fb-init', function(event, args) 
    {
      facebookService.getPageEventsById(108905739150385).then(
      function(response) 
      {
        $log.debug(JSON.stringify(response));
      },
      function(response) { 
        $log.debug(JSON.stringify(response));
      });
    });
    

  });
