define(['angular',
    'controllers/controllers',
    'services/services',
    // 'filters/filters',
    'directives/directives'
  ],
  function(angular) {
    angular.module('ascii.wh.App', ['controllers', 'services', /*'filters',*/ 'directives']);
  });