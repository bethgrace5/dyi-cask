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
                    //console.log(JSON.stringify(response))
                    deferred.reject('Error occured');
                } else {
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        }
    }
})
