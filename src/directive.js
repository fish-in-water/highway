import component from './component';
import element from './element';
import {unique, inject, getAttrs, MapList} from './utils';

const PRIOR = {
  EMERGENCY: -9,
  DEFAULT: 0
};

const priorities = [];
const directives = {};

const directive = function (name, directive, priority = PRIOR.DEFAULT) {
  if (!priorities.includes(priority)) {
    priorities.push(priority);
    priorities.sort(function (prev, next) {
      return prev - next;
    });
  }

  directive.priority = priority;
  directives[name] = directive;
};

Object.assign(directive, {
  PRIOR,
  initial($ctx) {
    $ctx.$directives = Object.assign({}, directives, $ctx.$directives);
    $ctx.$directives._instances = new MapList;
  },
  compile($el, $scope, $ctx, priority) {
    const iterator = function ($el, $ctx, priority) {
      if (component.isComponent($el, $ctx)) {
        return;
      }

      const attrs = getAttrs($el);
      for (let attr in attrs) {

        const index = attr.indexOf(':');
        const ori = attr;
        let arg = void 0;
        if (-1 != index) {
          attr = ori.substring(0, index);
          arg = ori.substring(index + 1);
        }

        const directive = $ctx.$directives[attr];
        if (directive && (directive.priority || PRIOR.DEFAULT) === priority) {
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

      for (const childNode of Array.from($el.children())) {
        iterator($(childNode), $ctx, priority);
      }
    }

    if (priority != null) {
      iterator($el, $ctx, priority);
    } else {
      for (const tmp of priorities) {
        if (tmp !== PRIOR.EMERGENCY) {
          iterator($el, $ctx, tmp);
        }
      }
    }
  },
  remove($el, $ctx) {
    const iterator = function ($el, $ctx) {
      if (component.isComponent($el, $ctx)) {
        return;
      }

      for (const childNode of Array.from($el.children())) {
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
