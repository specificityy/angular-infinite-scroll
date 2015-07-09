 define(['services/services', 'angular'], function(services, angular) {

   services.factory('httpProductsSvc', prodSvc);

   prodSvc.$inject = ['$http', '$q'];

   function prodSvc($http, $q) {
     var svc = {
       getFaces: getFaces,
       getTotal: getTotal
     };

     return svc;
     ///////

     // gets faces from the api
     function getFaces(skip, sort, limit) {
       var deferred = $q.defer();

       // custom config to ovvride the response transform
       var requestConfig = {
         method: 'GET',
         params: {
           limit: limit,
           skip: skip,
           sort: sort
         },
         transformResponse: overrideDefaultTransform()
       };

       $http.get('api/products', requestConfig).success(getProdSuccess).error(getProdError);

       return deferred.promise;
       ///////


       function getProdSuccess(data) {
         /*jshint -W030 */ // keep jshint happy
         data && deferred.resolve(data) || deferred.reject('No faces received.');
       }

       function getProdError(err, status, headers, config) {
         deferred.reject({
           error: err,
           status: status
         });
       }

       // overrides the default response transform function to prevent angular
       // from doing JSON.parse() to the newline-delimitted json response
       function overrideDefaultTransform() {
         $http.defaults.transformResponse[0] = performTransform;
         return $http.defaults.transformResponse[0];
       }

       // custom transform to convert response in array of objects
       function performTransform(value) {
         var ret = [];
         if (typeof value === 'string') {
           angular.forEach(value.split('\n'), function(item, key) {
             if (item !== '') {
               try {
                 ret.push(JSON.parse(item));
               } catch (e) {
                 console.log(e);
               }
             }
           });
         }
         return ret;
       }

     }


     // gets the total number of faces in the catalogue
     function getTotal() {
       var deferred = $q.defer();

       $http.get('api/total').success(getTotalSuccess).error(getTotalError);

       return deferred.promise;
       ///////


       function getTotalSuccess(data) {
         /*jshint -W030 */ // keep jshint happy
         data && deferred.resolve(data) || deferred.reject('No data received.');
       }

       function getTotalError(err, status, headers, config) {
         deferred.reject({
           error: err,
           status: status
         });
       }
     }
   }
 });