angular.module('dyiCaskApp')

.factory('facebookService', function($q, localStorageService) {
    return {
        getPageInfoById: function(page_id) {
            var deferred = $q.defer();

            FB.api('/' + page_id, 'GET', {
                fields:"name,picture,likes,were_here_count",
                access_token: localStorageService.get('fb_token')},
                
                function(response) {
                    if (!response || response.error) {
                        
                        deferred.reject('Error occured');
                    } else {
                        deferred.resolve(response);
                    }
                });

            return deferred.promise;
        },

        getPageEventsById: function(page_id) {
            var deferred = $q.defer();

            FB.api('/' + page_id +'/events', 'GET', {
                fields:"name,place,start_time",
                access_token: localStorageService.get('fb_token')},
                
                function(response) {
                    if (!response || response.error) {
                        
                        deferred.reject('Error occured');
                    } else {
                        deferred.resolve(response);
                    }
                });

            return deferred.promise;
        },

        getEventCoverPhotoById: function(event_id) {
            var deferred = $q.defer();

            FB.api('/' + event_id +'/?fields=cover', 'GET', {
                access_token: localStorageService.get('fb_token')},
                
                function(response) {
                    if (!response || response.error) {
                        
                        deferred.reject('Error occured');
                    } else {
                        deferred.resolve(response);
                    }
                });

            return deferred.promise;
        }
    }
})
