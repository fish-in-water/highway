import {deconstruct, secureHtml} from '../utils';

const show = function ({$ctx, $el, $arg, $exp}) { //$ctx, $el, $arg, $exp
  const {prop, watch} = deconstruct($exp);
  const watcher = function (value) {
    $el.css('display', value ? '' : 'none');
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

export default show;
