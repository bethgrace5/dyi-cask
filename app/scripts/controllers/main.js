'use strict';

/**
 * @ngdoc function
 * @name dyiCaskApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dyiCaskApp
 */
angular.module('dyiCaskApp')
  .controller('MainCtrl', function (facebookService, $q, $log, $scope) {

    $scope.locationRef = [
      '410616265786425',
      '875835105860557',
      '941260815906419',
      '243499665673625',
      '356550797717326',
      '750619864976173',
      '96361922275',
      '302943546438648',
      '290894474287798'
      ];

    $scope.getPagesEventsById = function(page_ids, after_dttm)
    {
      var promises = [];

      for (var i = 0; i < page_ids.length; i++)
        promises.push(facebookService.getPageEventsById(page_ids[i]));

      $q.all(promises).then(
        function(response) {
          var locations = [];

          for (var j = 0; j < response.length; j++)
          {
            var events = response[j].data
                              .map(function (e) { return {
                                place_name: e.place.name,
                                event_name: e.name,
                                location: e.place.location,
                                start_time: new Date(e.start_time) }; 
                              })
                              .filter(function (e) { return e.start_time.getTime() >= after_dttm.getTime(); })
                              .sort(function (l, r) { 
                                      if (l.start_time.getTime() < r.start_time.getTime()) { return -1; }
                                      else if (l.start_time.getTime() > r.start_time.getTime()) { return 1; }

                                      return 0; 
                              });

            
            if (events != null && events.length > 0)
              locations.push({ place_name: events[0].place_name, 
                                             events: events });
          }

          $scope.locations = locations;
          $log.debug($scope.locations);
        },
        function(response) {
          $scope.locations = [];
        });
    }  

    $scope.getPageEventsById = function(page_id, after_dttm)  
    {
      facebookService.getPageEventsById(page_id).then(
        function(response) {
          var events = response.data;

          $scope.currentEvents = events
                                  .map(function (e) { return {
                                    place_name: e.place.name,
                                    event_name: e.name,
                                    location: e.place.location,
                                    start_time: new Date(e.start_time) }; 
                                  })
                                  .filter(function (e) { return e.start_time.getTime() >= after_dttm.getTime(); })
                                  .sort(function (l, r) { 
                                      if (l.start_time.getTime() < r.start_time.getTime()) { return -1; }
                                      else if (l.start_time.getTime() > r.start_time.getTime()) { return 1; }

                                      return 0; 
                                  });

          $log.debug($scope.currentEvents);
        },
        function(response) { 
          $scope.currentEvents = [];
        });
    }

    $scope.$on('fb-init', function(event, args) 
    {
      //$scope.getPageEventsById('941260815906419', new Date());
      $scope.getPagesEventsById($scope.locationRef, new Date());
    });
    

  });
