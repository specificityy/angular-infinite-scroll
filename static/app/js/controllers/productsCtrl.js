define(['controllers/controllers'], function(controllers) {
  'use strict';

  controllers.controller('productsCtrl', productsCtrl);

  productsCtrl.$inject = ['adGeneratorSvc', 'collectionsHelpersSvc', 'httpProductsSvc'];

  function productsCtrl(adGeneratorSvc, collectionsHelpersSvc, httpProductsSvc) {
    /* jshint validthis: true */
    var vm = this;
    vm.faceList = [];
    vm.bufferedBatch = [];
    vm.loading = true;
    vm.orderBy = 'size';
    vm.remainingFaces = 0;
    vm.totalReached = false;

    vm.getMoreFaces = getMoreFaces;
    vm.setOrderBy = setOrderBy;

    activate();

    // kick start the view
    function activate() {
      // this method fetches the first faces batch on success
      getTotalFaces();
    }

    function getMoreFaces(isIdle) {
      if (vm.remainingFaces === 0) {
        vm.totalReached = true;
        return;
      }

      vm.loading = !isIdle;

      // if there's a buffered batch, render that one
      if (vm.bufferedBatch.length > 0) {
        vm.faceList = vm.faceList.concat(vm.bufferedBatch);
        vm.remainingFaces -= vm.bufferedBatch.length;
        vm.bufferedBatch.length = 0;
        vm.loading = false;
        return;
      }

      // gets the request limit
      var limit = adGeneratorSvc.getLimit(vm.faceList.length, vm.ramainingFaces);

      httpProductsSvc.getFaces(vm.faceList.length, vm.orderBy, limit)
        .then(getFacesSuccess, getFacesError);

      function getFacesError(error) {
        vm.loading = false;
        console.error(error);
      }

      function getFacesSuccess(data) {
        if (isIdle) {
          vm.bufferedBatch = data;
        } else {
          vm.faceList = vm.faceList.concat(data);
          vm.remainingFaces -= data.length;
          vm.loading = false;
        }

      }
    }


    function getTotalFaces() {
      httpProductsSvc.getTotal()
        .then(getTotalSuccess, getTotalError);

      function getTotalError(error) {
        console.error(error);
      }

      function getTotalSuccess(data) {
        vm.remainingFaces = parseInt(data);
        getMoreFaces();
      }
    }


    function setOrderBy(value) {
      if (value === vm.orderBy) {
        return;
      }

      vm.orderBy = value;
      vm.faceList.sort(collectionsHelpersSvc.compareByProp(vm.orderBy));
    }

  }

});