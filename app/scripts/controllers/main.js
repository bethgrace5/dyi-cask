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

    $scope.locationInfo = {}

    $scope.getPageInfoByIds = function(page_ids)
    {
      var promises = [];

      for (var i = 0; i < page_ids.length; i++)
        promises.push(facebookService.getPageInfoById(page_ids[i]));

      $q.all(promises).then(
        function(response) {
          var pageInfo = {};

          response.forEach(function (e) {
            $scope.locationInfo[e.id] = e;
          });

          $log.debug($scope.locationInfo);
        },
        function(response) {
          $log.debug(response);
        });
    }

    $scope.getPageEventsByIds = function(page_ids, after_dttm)
    {
      var promises = [];

      for (var i = 0; i < page_ids.length; i++)
        promises.push(facebookService.getPageEventsById(page_ids[i]));

      $q.all(promises).then(
        function(response) {
          var locations = [];

          $log.debug(response);

          for (var j = 0; j < response.length; j++)
          {
            var events = response[j].data
                              .map(function (e) { return {
                                place_id: e.place.id,
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
            {
              var e = events[0];

              locations.push({ place_name: e.place_name, 
                                place_img_url: $scope.locationInfo[e.place_id].picture.data.url,
                                place_likes: $scope.locationInfo[e.place_id].likes,
                                place_were_here_count: $scope.locationInfo[e.place_id].were_here_count,
                                events: events });
            }
          }

          $scope.locations = locations;
          $log.debug($scope.locations);
        },
        function(response) {
          $log.debug(response);
          $scope.locations = [];
        });
    }

    $scope.$on('fb-init', function(event, args) 
    {
      $scope.getPageInfoByIds($scope.locationRef);
      $scope.getPageEventsByIds($scope.locationRef, new Date());
    });
    

  });
