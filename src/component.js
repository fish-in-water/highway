import {getAttrs} from './utils';

const components = {};

const component = function (name, View) {
  components[name.toLowerCase()] = View;
};

Object.assign(component, {
  compile($el, $ctx) {
    // if is root
    if ($el === $ctx.$el) {
      $ctx.$components = Object.assign({}, components, $ctx.$components);
      $ctx.$components.$children = $ctx.$components.$children || [];
    }

    const iterator = ($el, $ctx) => {
      if (!$el || !$el.length || !$el[0]) {
        return;
      }

      for (const childNode of Array.from($el[0].childNodes || [])) {
        if (this.isComponent(childNode, $ctx)) {
          const instance = this.createComponent(childNode, $ctx);
          instance.$parent = $ctx;
          $ctx.$components.$children.push(instance);
        }
      }
    };

    //if root is component
    if (this.isComponent($ctx.$el, $ctx)) {
      this.createComponent($ctx.$el, $ctx);
    }

    iterator($ctx.$el, $ctx);
  },
  isComponent($el, $ctx) {
    const node = $el[0];
    return node &&
      node.nodeType === 1 &&
      $ctx.$components[node.tagName.toLowerCase()];
  },
  createComponent(node, $ctx) {
    const tagName = node.tagName.toLowerCase();
    const View = $ctx.$components[tagName];
    const $el = $('<div></div>').attr(Object.assign({'hi-component': tagName}, getAttrs($(node))));
    $(node).replaceWith($el);
    const instance = new View({$el});
    return instance;
  },
  destroy($ctx) {
    $ctx.$el.$children = null;
    $ctx.$children = null;

    console.log('component destroy')

  }
});

export default component;
