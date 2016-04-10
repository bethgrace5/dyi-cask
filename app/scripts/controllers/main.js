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

          //$log.debug($scope.placeInfo);
        },
        function(response) {
          //$log.debug(response);
        });
    }

    $scope.getPageEventsByIds = function(page_ids, after_dttm)
    {
      var promises = [];
      var eventDataMap = {};

      // Get events for all pages
      for (var i = 0; i < page_ids.length; i++)
        promises.push(facebookService.getPageEventsById(page_ids[i]));

      $q.all(promises).then(
        function(response) {
          var places = [];

          // Process page events
          for (var j = 0; j < response.length; j++)
          {
            var events = response[j].data
                              .map(function (e) { return {
                                place_id: e.place.id,
                                place_name: e.place.name,
                                event_id: e.id,
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

            var eventPromises = [];

            // Get event cover photos
            for(var k = 0; k < events.length; k++)
              eventPromises.push(facebookService.getEventCoverPhotoById(events[k].event_id));

            $q.all(eventPromises).then(
              function(eventResponse) {
                  // Store event cover data in lookup
                  for (var m = 0; m < eventResponse.length; m++)
                      eventDataMap[eventResponse[m].id] = (eventResponse[m].cover != null)?eventResponse[m].cover.source:null;

                  $scope.places = places;
                  $scope.upcomingEvents = $scope.places.map(function (e) { return { place_name: e.place_name, 
                                                                                    place_img_url: e.place_img_url,
                                                                                    place_likes: e.place_likes,
                                                                                    place_were_here_count: e.place_were_here_count,
                                                                                    current_event: (e.events.length > 0)?e.events[0]:null,
                                                                                    current_event_cover_url: (e.events.length > 0)?eventDataMap[e.events[0].event_id]:"http://www.visualcandi.com/wp-content/uploads/2013/05/white.png" };
                                                                                });

                  $log.debug("$scope.places");
                  $log.debug($scope.places);
                  $log.debug("$scope.upcomingEvents");
                  $log.debug($scope.upcomingEvents);
              },
              function( eventResponse) {}
            );
          }  
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
