import {inject} from './utils';

const directives = {};

const directive = function (name, directive) {
  directives[name] = directive;
};

const privates = {
  getAttrs($el) {
    const attrs = {};
    const node = $el[0];
    for (const attr in node.attributes) {
      if (node.attributes.hasOwnProperty(attr)) {
        attrs[node.attributes[attr].name] = node.attributes[attr].value;
      }
    }
    return attrs;
  }
};

Object.assign(directive, {
  compile($ctx) {
    $ctx.$directives = Object.assign({}, directives, $ctx.$directives);
    $ctx.$directives._instances = [];
    const iterator = function ($el, $ctx) {

      for (const $child of $el.$children || []) {
        iterator($child, $ctx);
      }

      const attrs = privates.getAttrs($el);
      for (let attr in attrs) {
        const index = attr.indexOf(':');
        const ori = attr;
        let arg = void 0;
        if (-1 != index) {
          attr = ori.substring(0, index);
          arg = ori.substring(index + 1);
        }

        if ($ctx.$directives[attr]) {
          const instance = $ctx.$directives[attr]({
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

    iterator($ctx.$el, $ctx);
  },

  destroy($ctx) {
    console.log('directive destroy')

  }
});

export default directive;
