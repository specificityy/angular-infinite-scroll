 define(['services/services'], function(services) {

   services.factory('collectionsHelpersSvc', colHelpSvc);

   function colHelpSvc() {
     var svc = {
       compareByProp: compareByProp
     };

     return svc;
     ///////

     function compareByProp(prop) {
       return function(a, b) {
         if (a[prop] > b[prop]) {
           return 1;
         }
         if (a[prop] < b[prop]) {
           return -1;
         }
         return 0;
       };
     }

   }

 });