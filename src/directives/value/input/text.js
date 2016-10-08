import {deconstruct, secureHtml} from '../../../utils';

const text = function ({$el, $arg, $exp, $scope}) { //$ctx, $el, $arg, $exp
  const {prop, watch, secure} = deconstruct($exp);
  const watcher = function (value) {
    $el.val(secure ? secureHtml(value) : value);
  };
  const inputer = function () {
    $scope.$set(prop, $el.val());
  };

  watcher($scope.$get(prop));

  if (watch) {
    return {
      $mount() {
        $scope.$watch(prop, watcher);
        $el.on('input', inputer);
      },
      $unmount() {
        $scope.$unwatch(prop, handler);
        $el.off('input', inputer);
      }
    };
  }
};

export default text;
