angular.module('dyiCaskApp')

.factory('facebookService', function($q, localStorageService) {
    return {
        getMyLastName: function() {
            var deferred = $q.defer();
            FB.api('/me', {
                fields: 'last_name',
                access_token: localStorageService.get('fb_token')
            }, function(response) {
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
        }
    }
})
