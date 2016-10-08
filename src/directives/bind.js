import {deconstruct, secureHtml} from '../utils';

const bind = function ({$el, $arg, $exp, $scope}) { //$ctx, $el, $arg, $exp
  const {prop, watch, secure} = deconstruct($exp);
  const watcher = function (value) {
    $el.html(secure ? secureHtml(value) : value);
  };

  watcher($scope.$get(prop));

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
