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

    $scope.placeRef = [
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

    $scope.placeInfo = {}

    $scope.getPageInfoByIds = function(page_ids)
    {
      var promises = [];

      for (var i = 0; i < page_ids.length; i++)
        promises.push(facebookService.getPageInfoById(page_ids[i]));

      $q.all(promises).then(
        function(response) {
          var pageInfo = {};

          response.forEach(function (e) {
            $scope.placeInfo[e.id] = e;
          });

          $log.debug($scope.placeInfo);
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
          var places = [];

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

              places.push({ place_name: e.place_name, 
                                place_img_url: $scope.placeInfo[e.place_id].picture.data.url,
                                place_likes: $scope.placeInfo[e.place_id].likes,
                                place_were_here_count: $scope.placeInfo[e.place_id].were_here_count,
                                events: events });
            }
          }

          $scope.places = places;
          $log.debug($scope.places);
        },
        function(response) {
          //$log.debug(response);
          $scope.places = [];
        });
    }
    $scope.$on('fb-init', function(event, args) {
      $scope.getPageInfoByIds($scope.placeRef);
      $scope.getPageEventsByIds($scope.placeRef, new Date());
    });


  });
