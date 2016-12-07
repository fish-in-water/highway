import {deconstruct, secureHtml} from '../utils';
import compiler from '../compiler';
import element from '../element';
import directive from '../directive';

const ef = function ({$ctx, $el, $arg, $exp, $scope}) { //$ctx, $el, $arg, $exp
  const {prop, watch} = deconstruct($exp);
  const $clone = $el.clone();
  const $prev = $el.prev();
  const $next = $el.next();
  const $parent = $el.parent();
  let $new = $el;
  const watcher = function (value) {
    if (value) {
      $new = $clone.clone();
      if ($next.length && $next.parent().length) {
        $new.insertBefore($next);
      } else if ($prev.length && $prev.parent().length) {
        $new.insertAfter($prev);
      } else {
        $new.appendTo($parent);
      }

      compiler.compile($new, $scope, $ctx);
      //$ctx.$compile($new);
      //$new.attr('hi-compiled', 'true');

      $scope.$unwatch(prop, watcher);
    } else {
      compiler.remove($new, $ctx);
      //$ctx.$remove($new);
      $scope.$watch(prop, watcher);
    }
  };

  if (!$ctx.$scope.$get(prop)) {
    compiler.remove($el, $ctx);
    //$ctx.$remove($el);
  }

  if (watch) {
    let unwatcher = null;
    return {
      $mount() {
        unwatcher = $scope.$watch(prop, watcher);
      },
      $unmount() {
        unwatcher();
      },
      $halt: true
    };
  }
};

export default ef;
