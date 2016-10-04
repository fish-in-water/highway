import {deconstruct, secureHtml} from '../utils';
import element from '../element';

const ef = function ({$ctx, $el, $arg, $exp}) { //$ctx, $el, $arg, $exp
  const {prop, watch} = deconstruct($exp);
  let $clone = $el;


  const watcher = function (value) {

    if (value) {

      const {$parent, index} = element.where($clone, $ctx);
      if (-1 === index) { //not in element tree
        $clone = $ctx.$compile($clone);
      }
    } else {
      $ctx.$remove($el);
    }
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

export default ef;
