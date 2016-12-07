import {deconstruct, secureHtml, isArray, isObject, assign} from '../utils';
import compiler from '../compiler';
import pipe from '../pipe';

let counter = 0;

const repeat = function ({$ctx, $el, $arg, $exp, $scope, $directive}) {
  const {prop, watch, secure, pipes} = deconstruct($exp);

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
  //$ctx.$remove($el);
  compiler.remove($el, $ctx);

  const clear = function () {
    // clear els
    for (const $el of $els) {
      //$ctx.$remove($el);
      compiler.remove($el, $ctx);
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
          if (isObject(value[i])) {
            data[itemProp] = assign(value[i], {$index: i});
          } else {
            data[itemProp] = value[i];
          }

          // create new scope
          const scope = $scope.$create(data).$mount();
          //scope.$parent = $scope;
          scopes.push(scope);

          // create new element
          const $el = $clone.clone();

          // compile
          $ctx.$scope = scope;
          compiler.compile($el, scope, $ctx);
          $ctx.$scope = $scope;

          //$ctx.$compile($el, scope);

          $el.attr('hi-compiled', 'true');

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

  const pipeline = pipe.compile({
    prop: arrayProp, watch, secure
  }, pipes, $scope, watcher, $ctx);

  watcher(pipeline($scope.$get(arrayProp)));

  if (watch) {
    let unwatcher = null;
    return {
      $mount() {
        unwatcher = $scope.$watch(arrayProp, function (value) {
          watcher(pipeline(value))
        });
      },
      $unmount() {

        pipeline.destroy();

        clear();

        unwatcher();
      },
      $halt: true
    };
  } else {
    pipeline.destroy();
  }
};

export default repeat;
