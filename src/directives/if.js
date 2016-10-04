import {deconstruct, secureHtml} from '../utils';
import element from '../element';

const ef = function ({$ctx, $el, $arg, $exp}) { //$ctx, $el, $arg, $exp
  const {prop, watch} = deconstruct($exp);
  const {$parent, index} = element.where($el, $ctx);

  if (!$ctx.$scope.$get(prop)) {
    $ctx.$remove($el);
  }

  if (watch) {
    const $clone = element.clone($el);
    const watcher = function (value) {
      if (value) {
        $el = element.clone($clone);
        element.append($el, $parent, index, $ctx);

        //$el.html('1');
        //$el.css('background-color', 'red')
        $ctx.$compile($el);

        debugger;
      } else {
        $ctx.$remove($el);
      }
    };

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

export default ef;
