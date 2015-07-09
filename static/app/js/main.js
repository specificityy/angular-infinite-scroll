(function() {
  'use strict';

  require.config({
    paths: {
      angular: ['../../../bower_components/angular/angular'],
      jquery: ['../../../bower_components/jquery/dist/jquery']
    },

    waitSeconds: 30,
    shim: {
      angular: {
        deps: ['jquery'],
        exports: 'angular'
      }
    }
  });

  require([
    // external js files
    'app',
    'angular',
    'controllers/productsCtrl',
    'directives/af-ascii-faces',
    'directives/af-infinite-scroll',
    'services/adGeneratorSvc',
    'services/collectionsHelpersSvc',
    'services/httpProductsSvc'
  ]);
})();