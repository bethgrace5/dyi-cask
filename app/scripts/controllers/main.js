'use strict';

/**
 * @ngdoc function
 * @name dyiCaskApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dyiCaskApp
 */
angular.module('dyiCaskApp')
  .controller('MainCtrl', function (facebookService, $q, $log, $scope, $location, $rootScope) {

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
    $rootScope.activeTab = '/';
    $scope.isActive = function(isActive) {
      if (isActive) {
        return 'active';
      }
    }

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

      for (var i = 0; i < page_ids.length; i++)
        promises.push(facebookService.getPageEventsById(page_ids[i]));

      $q.all(promises).then(
        function(response) {
          var places = [];

          //$log.debug(response);

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
          //$log.debug($scope.places);
        },
        function(response) {
          //$log.debug(response);
          $scope.places = [];
        });
    }
    $scope.$on('fb-init', function(event, args) {
      $rootScope.facebookIsReady = true;
      $scope.getPageInfoByIds($scope.placeRef);
      $scope.getPageEventsByIds($scope.placeRef, new Date());
    });


  });

/*
    $scope.placeRef = [
      '106289299828',
      '159106834124397',
      '104082642374',
      '361252060558',
      '120407701421695',
      '169514419745428',
      '316168245097549',
      '152592998225192',
      '71038443022',
      '496538127189016',
      '309208028534',
      '330788300358022',
      '982136201842628',
      '746507505457411'
      '332092754207',
      '875835105860557',
      '941260815906419',
      '243499665673625',
      '356550797717326',
      '750619864976173',
      '96361922275',
      '302943546438648',
      '120528211293536',
      '410616265786425',
      '158365010843369',
      '243499665673625',
      '122561011133606',
      '309701170946',
      '320565853091',
      '102833439786658',
      '143696572044',
      '1485318041731658',
      '109617635741320',
      '190953297590794',
      '108353255886682',
      '156165764435213',
      '100198520020687',
      '1037126806314774',
      '441371262554620',
      '333982903385648',
      '109474482424263',
      '715455031818513',
      '105965009445855',
      '143022082401542',
      '117103481640820',
      '118657428170978',
      '109328215774834',
      '113524452014215',
      '52496068134771',
      '183052561716629',
      '299594931910',
      '170423633022931',
      '115162531901204',
      '180651118683931',
      '299245190262553',
      '294969763934545',
      '171572506361096',
      '498537413656527',
      '186163881394204',
      '170308539481'];
*/
