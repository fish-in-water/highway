import {deconstruct, secureHtml, isArray} from '../utils';

const repeat = function ({$ctx, $el, $arg, $exp, $scope, $directive}) {
  const {prop, watch, pipes} = deconstruct($exp);
  const $clone = $el.clone().removeAttr($directive).removeAttr('hi-id');
  const $prev = $el.prev();
  const $next = $el.next();
  const $parent = $el.parent();
  const matches = prop.match(/(\S*)\s+in\s+(\S*)/);
  const itemProp = matches[1];
  const arrayProp = matches[2];
  let $els = [];
  let scopes = [];

  // remove current el
  $ctx.$remove($el);

  const clear = function () {
    // clear els
    for (const $el of $els) {
      $ctx.$remove($el);
    }
    $els = [];

    // clear scopes
    for (const scope of scopes) {
      scope.$unmount();
    }
    scopes = [];
  };

  const watcher = function (value) {

    value = $ctx.$scope.$pipe(value, pipes);

    clear();

    if (value && isArray(value) && value.length) {

      for (let i = 0, ii = value.length; i < ii; i++) {

        (function () {
          const data = {};
          data[itemProp] = value[i];

          // create new scope
          const scope = $scope.$create(data);
          scope.$parent = $scope;
          scope.$mount();
          scopes.push(scope);

          // create new element
          const $el = $clone.clone();

          // compile
          $ctx.$compile($el, scope);

          $els.push($el);

        })();
      }

      if ($el.length && $next.parent().length) {
        for (const $el of $els) {
          $el.insertBefore($next);
        }
      } else if ($prev.length && $prev.parent().length) {
        for (const $el of $els.reverse()) {
          $el.insertAfter($prev);
        }
      } else {
        for (const $el of $els) {
          $el.appendTo($parent);
        }
      }
    }
  };

  watcher($ctx.$scope.$get(arrayProp));

  if (watch) {
    return {
      $mount() {
        $scope.$watch(arrayProp, watcher);
      },
      $unmount() {
        $scope.$unwatch(arrayProp, watcher);

        clear();
      }
    };
  }
};

export default repeat;
