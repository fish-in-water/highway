import {assign, getAttrs, MapList} from './utils';
import element from './element';

const components = {};

const component = function (name, View) {
  components[name.toLowerCase()] = View;
};

assign(component, {
  initial($ctx) {
    $ctx.$components = assign({}, components, $ctx.$components);
    $ctx.$components._instances = new MapList;
    //$ctx.$components.$children = $ctx.$components.$children || [];
  },
  compile($el, $scope, $ctx) {

    const iterator = ($el, $ctx) => {
      if (!$el || !$el.length || !$el[0]) {
        return;
      }

      for (const childNode of Array.prototype.slice.call($el.children())) {
        if (this.isComponent($(childNode), $ctx)) {
          const instance = this.createComponent(childNode, $ctx);
          instance.$parent = $ctx;
          $ctx.$components._instances.add(element.getId(instance.$el, true), instance);
        }
      }
    };

    //if root is component
    if (this.isComponent($ctx.$el, $ctx)) {
      this.createComponent($ctx.$el, $ctx);
    }

    iterator($el, $ctx);
  },
  isComponent($el, $ctx) {

    // if created
    const instances = $ctx.$components._instances.find(element.getId($el));
    if (instances && instances.length) {
      return true;
    }

    // not created
    const node = $el[0];
    return node &&
      node.nodeType === 1 &&
      !!$ctx.$components[node.tagName.toLowerCase()];
  },
  createComponent(node, $ctx) {
    const tagName = node.tagName.toLowerCase();
    const View = $ctx.$components[tagName];
    const $el = $('<div></div>').attr(assign({'hi-component': tagName}, getAttrs($(node))));
    $(node).replaceWith($el);
    const instance = new View({$el});
    return instance;
  },
  remove($el, $ctx) {
    const iterator = function ($el, $ctx) {
      if (component.isComponent($el, $ctx)) {
        const id = element.getId($el);
        if (id != null) {
          const instances = $ctx.$components._instances.find(id);
          for (const instance of instances) {
            instance.$destroy();
          }
          $ctx.$components._instances.remove(id);
        }

        return;
      }

      for (const childNode of Array.from($el.children())) {
        iterator($(childNode), $ctx);
      }
    };

    iterator($el, $ctx);
  },
  destroy($ctx) {
    const keys = $ctx.$components._instances.keys();
    for (const key in keys) {
      const instances = $ctx.$directives._instances.find(key);
      for (const instance of instances) {
        instance.$destroy();
      }
    }

    $ctx.$el.$children = null;
    $ctx.$children = null;
  }
});

export default component;
