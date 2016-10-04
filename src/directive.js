import {inject, getAttrs} from './utils';

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
  compile($el, $ctx, priority) {
    // if is root
    if ($el === $ctx.$el) {
      $ctx.$directives = Object.assign({}, directives, $ctx.$directives);
      $ctx.$directives._instances = [];
    }

    const iterator = function ($el, $ctx, priority) {
      for (const $child of $el.$children || []) {
        iterator($child, $ctx, priority);
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
            $exp: attrs[ori]
          });

          if (instance) {
            instance.$mount && instance.$mount();
            $ctx.$directives._instances.push(instance);
          }
        }
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

  destroy($ctx) {
    console.log('directive destroy')

  }
});

export default directive;
