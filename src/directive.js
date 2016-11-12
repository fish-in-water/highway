import component from './component';
import element from './element';
import pipe from './pipe';
import {assign, includes, unique, inject, getAttrs, deconstruct, secureHtml, MapList} from './utils';

const PRIOR = {
  EMERGENCY: -9,
  DEFAULT: 0
};

const priorities = [];
const directives = {};

const directive = function (name, directive, priority = PRIOR.DEFAULT) {
  if (!includes(priorities, priority)) {
    priorities.push(priority);
    priorities.sort(function (prev, next) {
      return prev - next;
    });
  }

  directive.priority = priority;
  directives[name] = directive;
};

assign(directive, {
  PRIOR,
  initial($ctx) {
    $ctx.$directives = assign({}, directives, $ctx.$directives);
    $ctx.$directives._instances = new MapList;
  },
  compile($el, $scope, $ctx) {

    const handler = function ($el, $ctx, priority) {

      if (component.isComponent($el, $ctx)) {
        return $el;
      }

      const attrs = getAttrs($el);
      for (var attr in attrs) {

        const index = attr.indexOf(':');
        const ori = attr;
        let arg = void 0;
        if (index != -1) {
          attr = ori.substring(0, index);
          arg = ori.substring(index + 1);
        }

        const directive = $ctx.$directives[attr];
        if (directive && directive.priority === priority) {
          const instance = directive({
            $ctx,
            $el,
            $arg: arg,
            $exp: attrs[ori],
            $scope,
            $directive: attr
          });

          if (instance) {
            instance.$mount && instance.$mount($ctx);
            $ctx.$directives._instances.add(element.getId($el, true), instance);

            // halt compile
            if (instance.$halt) {
              return null;
            }

            // if $el changed after compile
            if (instance.$el) {
              $el = instance.$el;
            }
          }
        }
      }

      return $el;
    };

    $el = priorities.reduce(function ($el, priority) {
      if (!$el) {
        return null;
      }

      return handler($el, $ctx, priority);
    }, $el);

    return $el;

    /*
    const iterator = function ($el, $ctx, priority) {

      if ($el.attr('hi-compiled') || component.isComponent($el, $ctx)) {
        return;
      }

      const attrs = getAttrs($el);
      for (var attr in attrs) {

        const index = attr.indexOf(':');
        const ori = attr;
        let arg = void 0;
        if (index != -1) {
          attr = ori.substring(0, index);
          arg = ori.substring(index + 1);
        }

        const directive = $ctx.$directives[attr];
        if (directive && directive.priority === priority) {

          const instance = directive({
            $ctx,
            $el,
            $arg: arg,
            $exp: attrs[ori],
            $scope,
            $directive: attr
          });

          if (instance) {
            instance.$mount && instance.$mount($ctx);
            $ctx.$directives._instances.add(element.getId($el, true), instance);
          }
        }
      }

      for (const childNode of Array.prototype.slice.call($el.children())) {
        iterator($(childNode), $ctx, priority);
      }
    };

    //iterator($el, $ctx, priority);

    if (priority != null) {
      iterator($el, $ctx, priority);
    } else {
      for (const tmp of priorities) {
        if (tmp !== PRIOR.EMERGENCY) {
          iterator($el, $ctx, tmp);
        }
      }
    }

    */
  },
  pattern($exp, $scope, $ctx, $update) {
    const {prop, watch, secure, pipes} = deconstruct($exp);
    const wather = function (newVal, oldVal) {
      $update({newVal, oldVal, secure}); //secure ? secureHtml(value) : value
    };
    const pipeline = pipe.compile({
      prop, watch, secure
    }, pipes, $scope, wather, $ctx);

    wather(pipeline($scope.$get(prop)));

    if (watch) {
      let unwatcher = null;
      return {
        $mount() {
          unwatcher = $scope.$watch(prop, function (newVal, oldVal) {
            wather(pipeline(newVal), pipeline(oldVal));
          });
        },
        $unmount() {
          unwatcher();
          pipeline.destroy();
        }
      };
    } else {
      pipeline.destroy();
    }
  },
  remove($el, $ctx) {
    if (component.isComponent($el, $ctx)) {
      return;
    }

    const id = element.getId($el);
    if (id != null) {
      const instances = $ctx.$directives._instances.find(id);
      for (const instance of instances) {
        instance.$unmount && instance.$unmount($ctx);
      }
      $ctx.$directives._instances.remove(id);
    }

    /*
    const iterator = function ($el, $ctx) {
      if (component.isComponent($el, $ctx)) {
        return;
      }

      for (const childNode of Array.prototype.slice.call($el.children())) {
        iterator($(childNode), $ctx);
      }

      const id = element.getId($el);
      if (id != null) {
        const instances = $ctx.$directives._instances.find(id);
        for (const instance of instances) {
          instance.$unmount && instance.$unmount($ctx);
        }
        $ctx.$directives._instances.remove(id);
      }
    };

    iterator($el, $ctx);
    */
  },
  destroy($ctx) {
    const keys = $ctx.$directives._instances.keys();
    for (const key in keys) {
      const instances = $ctx.$directives._instances.find(key);
      for (const instance of instances) {
        instance.$unmount && instance.$unmount(this);
      }
    }

    $ctx.$directives._instances.clear();
    $ctx.$directives._instances = null;
    $ctx.$directives = null;
  }
});

export default directive;

// install build-in
import ef from './directives/if';
import repeat from './directives/repeat';
import on from './directives/on';
import bind from './directives/bind';
import value from './directives/value';
import show from './directives/show';
import hide from './directives/hide';
import disable from './directives/disable';
import enable from './directives/enable';
import readonly from './directives/readonly';
import src from './directives/src';
import href from './directives/href';
import klass from './directives/klass';
import attr from './directives/attr';
import css from './directives/css';
import data from './directives/data';

directive('hi-if', ef, directive.PRIOR.EMERGENCY);
directive('hi-repeat', repeat, directive.PRIOR.EMERGENCY);
directive('hi-on', on);
directive('hi-bind', bind);
directive('hi-value', value);
directive('hi-show', show);
directive('hi-hide', hide);
directive('hi-disable', disable);
directive('hi-enable', enable);
directive('hi-readonly', readonly);
directive('hi-src', src);
directive('hi-href', href);
directive('hi-class', klass);
directive('hi-attr', attr);
directive('hi-css', css);
directive('hi-data', data);
