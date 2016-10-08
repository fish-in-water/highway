import {deconstruct, secureHtml, isArray} from '../utils';

const repeat = function ({$ctx, $el, $arg, $exp, $scope, $directive}) {
  const {prop, watch} = deconstruct($exp);
  const $clone = $el.clone().removeAttr($directive);
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
          if ($el.length && $next.parent().length) {
            $el.insertBefore($next);
          } else if ($prev.length && $prev.parent().length) {
            $el.insertAfter($prev);
          } else {
            $el.prependTo($parent);
          }
          $els.push($el);

          // compile
          $ctx.$compile($el, scope);

        })();
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
