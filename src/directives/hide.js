import {deconstruct, secureHtml} from '../utils';

const hide = function ({$el, $arg, $exp, $scope}) { //$ctx, $el, $arg, $exp
  const {prop, watch} = deconstruct($exp);
  const watcher = function (value) {
    $el.css('display', !value ? '' : 'none');
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

export default hide;
