import {deconstruct, secureHtml} from '../utils';
import element from '../element';
import directive from '../directive';

const ef = function ({$ctx, $el, $arg, $exp}) { //$ctx, $el, $arg, $exp
  const {prop, watch} = deconstruct($exp);
  const $clone = $el.clone();
  const $prev = $el.prev();
  const $next = $el.next();
  const $parent = $el.parent();
  let $new = $el;
  const watcher = function (value) {
    if (value) {
      $new = $clone.clone();
      if ($prev.length && $prev.parent().length) {
        $new.insertAfter($prev);
      } else if ($next.length && $next.parent().length) {
        $new.insertBefore($next);
      } else {
        $new.prependTo($parent);
      }
      $ctx.$compile($new);
      $ctx.$scope.$unwatch(prop, watcher);
    } else {
      $ctx.$remove($new);
      $ctx.$scope.$watch(prop, watcher);
    }
  };

  if (!$ctx.$scope.$get(prop)) {
    $ctx.$remove($el);
  }

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
