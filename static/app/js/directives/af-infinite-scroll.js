define(['directives/directives', 'lodash'], function(directives, _) {

  directives.directive('afInfiniteScroll', scroll);

  scroll.$inject = ['$window', '$document', '$interval', '$timeout'];

  function scroll($window, $document, $interval, $timeout) {
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
        .on('scroll.infinite', _.debounce(onDocumentScrollDown, 300))
        .on('mousemove.idle keypress.idle click.idle', onDocumentKeyOrMouse);

      scope.idleTime = 0;
      scope.$on('$destroy', cleanUp);
      var idleInterval = $interval(checkIdleTime, 5e3);

      // if idle for 10 secs, fetch the next batch without rendering it
      function checkIdleTime() {
        scope.idleTime += 5;

        // if there is no scroll, fetch the next batch on next digest cycle
        if ($window.innerHeight >= $document[0].documentElement.scrollHeight) {
          $timeout(onDocumentScrollDown);
        } else if (scope.idleTime > 5 && !scope.loading) {
          scope.fetchIdleBatch();
          $interval.cancel(idleInterval); // cancel the interval to not fetch another batch until buffer is cleared
          scope.idleTime = 0;
        }
      }

      function cleanUp() {
        angular.element($document).off('scroll.infinite mousemove.idle keypress.idle click.idle');
        $interval.cancel(idleInterval);
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
          idleInterval = $interval(checkIdleTime, 5e3);
        }

        // fetches and render the next batch
        if ($window.scrollY >= ($document[0].documentElement.offsetHeight - $window.innerHeight - 350)) {
          scope.$apply(scope.onScrollDown);
        }
      }

    }
  }
});