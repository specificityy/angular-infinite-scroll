define(['directives/directives'], function(directives) {

  directives.directive('afInfiniteScroll', scroll);

  scroll.$inject = ['$window', '$document', '$interval'];

  function scroll($window, $document, $interval) {
    var directive = {
      restrict: 'EA',
      link: link,
      scope: {
        loading: '=',
        totalReached: '=',
        fetchIdleBatch: '&?',
        onScrollDown: '&?',
      }
    };
    return directive;
    ///////

    function link(scope, el, attr) {

      // removes events first to prevent multiple assignment
      angular.element($document)
        .off('scroll.infinite mousemove.idle keypress.idle click.idle')
        .on('scroll.infinite', onDocumentScrollDown)
        .on('mousemove.idle keypress.idle click.idle', onDocumentKeyOrMouse);

      scope.idleTime = 0;
      var idleInterval = $interval(checkIdleTime, 5e3);

      // if idle for 10 secs, fetch the next batch without rendering it
      function checkIdleTime() {
        scope.idleTime += 5;

        if (scope.idleTime > 5 && !scope.loading) {
          scope.fetchIdleBatch();
          $interval.cancel(idleInterval); // cancel the interval to not fetch another batch until buffer is cleared
          scope.idleTime = 0;
        }
      }

      function onDocumentKeyOrMouse() {
        scope.idleTime = 0;
      }

      function onDocumentScrollDown() {
        // prevents multiple api requests
        if (scope.loading) {
          return;
        }

        // resumes the interval
        if (idleInterval.$$state.value === 'canceled') {
          idleInterval = $interval(checkIdleTime, 5000);
        }

        // removes event listener on end of catalogue and cancel the interval
        if (scope.totalReached) {
          angular.element($document).off('scroll.infinite mousemove.idle keypress.idle click.idle');
          $interval.cancel(idleInterval);
          return;
        }

        // fetches and render the next batch
        if ($window.scrollY >= $document[0].documentElement.offsetHeight - $window.innerHeight) {
          scope.$apply(scope.onScrollDown);
        }
      }

    }
  }
});