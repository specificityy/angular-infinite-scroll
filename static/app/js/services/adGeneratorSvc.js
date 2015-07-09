 define(['services/services'], function(services) {

   services.factory('adGeneratorSvc', adsSvc);

   adsSvc.$inject = [];

   function adsSvc() {
     var svc = {
       adIndex: 20,
       adCount: 0,
       lastAd: undefined,
       getAdSrc: getAdSrc,
       getLimit: getLimit
     };

     return svc;
     ///////

     function getAdSrc() {
       var ad;

       do {
         ad = Math.floor(Math.random() * 1e3);
       } while (this.lastAd === ad);

       this.lastAd = ad;
       this.adCount++;

       return ad;
     }

     // sets the limit to a multiple of 3 since we have rows of 3 cols
     // and get extra items to make up for the space took up by the ads
     function getLimit(faces, remainder) {

       var limit = 9;

       // prevents asking for more faces than the catalogue limit
       if (remainder < limit) {
         limit = remainder;
       }
       // make up for the space took up by the ads
       else if (Math.floor((faces + limit) / this.adIndex) > this.adCount) {
         // adCount hasn't been updated at this point so add 1
         var toAdd = (faces + this.adCount + 1) % 3;

         // don't ask for extra items if ad is the last item in the row
         limit += 3 - (toAdd === 0 && 3 || toAdd);
       }

       return limit;

     }
   }

 });