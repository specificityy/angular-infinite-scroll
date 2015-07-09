define(['directives/directives'], function (directives) {

  directives.directive('afAsciiFaces', asciiFaces);

  function asciiFaces() {
    var directive = {
      bindToController: true,
      controller: asciiFacesCtrl,
      controllerAs: 'vm',
      templateUrl: 'app/partials/directives/af-ascii-faces.html',
      restrict: 'EA',
      scope: {
        faceList: '=',
        orderBy: '='
      }
    };
    /*jshint -W027*/ // keep jshint happy
    return directive;
    ///////

    asciiFacesCtrl.$inject = ['adGeneratorSvc'];

    function asciiFacesCtrl(adGeneratorSvc) {
      var vm = this;

      vm.adIndexList = {};
      vm.getAdSrc = getAdSrc;
      vm.showAd = showAd;

      function getAdSrc(index) {
        // in case ng-repeat triggers multiple times, return the same ad
        if (index in vm.adIndexList) {
          return vm.adIndexList[index];
        }

        // gets the ad paramenter and saves it
        var ad = adGeneratorSvc.getAdSrc();
        vm.adIndexList[index] = ad;

        return ad;
      }

      function showAd(index) {
        return index > 1 && index % adGeneratorSvc.adIndex === 0;
      }
    }
  }
});