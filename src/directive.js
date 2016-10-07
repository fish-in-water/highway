import {unique, inject, getAttrs, MapList} from './utils';
import component from './component';

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
  compile($el, $ctx, priority) {
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
          $el.id = unique('e');

          const instance = directive({
            $ctx,
            $el,
            $arg: arg,
            $exp: attrs[ori]
          });

          if (instance) {
            instance.$mount && instance.$mount();
            $ctx.$directives._instances.add($el.id, instance);
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

      const instances = $ctx.$directives._instances.find($el.id);
      for (const instance of instances) {
        instance.$unmount && instance.$unmount();
      }
      $ctx.$directives._instances.remove($el[0]);
    };

    iterator($el, $ctx);
  },
  destroy($ctx) {
    console.log('directive destroy')

  }
});

export default directive;
