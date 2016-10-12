import {deconstruct, secureHtml} from '../utils';

const bind = function ({$el, $arg, $exp, $scope}) { //$ctx, $el, $arg, $exp
  const {prop, watch, secure, pipes} = deconstruct($exp);
  const watcher = function (value) {
    $el.html(secure ? secureHtml(value) : value);
  };

  watcher($scope.$pipe($scope.$get(prop), pipes));

  if (watch) {
    return {
      $mount() {
        $scope.$watch(prop, watcher);
      },
      $unmount() {
        $scope.$unwatch(prop, watcher);
      }
    };
  }
};

export default bind;
