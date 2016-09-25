import {deconstruct, secureHtml} from '../../../utils';

const text = function ({$ctx, $el, $arg, $exp}) { //$ctx, $el, $arg, $exp
  const {prop, watch, secure} = deconstruct($exp);
  const watcher = function (value) {
    $el.val(secure ? secureHtml(value) : value);
  };
  const inputer = function () {
    $ctx.$scope.$set(prop, $el.val());
  };

  watcher($ctx.$scope.$get(prop));

  if (watch) {
    return {
      $mount() {
        $ctx.$scope.$watch(prop, watcher);
        $el.on('input', inputer);
      },
      $unmount() {
        $ctx.$scope.$unwatch(prop, handler);
        $el.off('input', inputer);
      }
    };
  }
};

export default text;
