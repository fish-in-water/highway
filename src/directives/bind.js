import {deconstruct, secureHtml} from '../utils';

const bind = function ({$ctx, $el, $arg, $exp}) { //$ctx, $el, $arg, $exp
  const {prop, watch, secure} = deconstruct($exp);
  const watcher = function (value) {
    $el.html(secure ? secureHtml(value) : value);
  };

  watcher($ctx.$scope.$get(prop));

  if (watch) {
    return {
      $mount() {
        $ctx.$scope.$watch(prop, watcher);
      },
      $unmount() {
        $ctx.$scope.$unwatch(prop, watcher);
      }
    };
  }
};

export default bind;
