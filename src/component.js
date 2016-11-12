import {assign, getAttrs, MapList} from './utils';
import element from './element';

const components = {};

const component = function (name, View) {
  components[name.toLowerCase()] = View;
};

assign(component, {
  initial($ctx) {
    $ctx.$children = [];

    //const tmp = {};
    //for (const component in $ctx.$components || {}) {
    //  components[component.toLowerCase] = $ctx.$components[component];
    //}
    $ctx.$components = assign({}, components, (() => {
      const components = {};
      for (const name in $ctx.$components) {
        components[name.toLowerCase()] = $ctx.$components[name];
      }
      return components;
    })());

    $ctx.$components._instances = new MapList;
    $ctx.$components.$refs = {};
    //$ctx.$components.$children = $ctx.$components.$children || [];
  },
  compile($el, $scope, $ctx) {
    if (!this.isComponent($el, $ctx)) {
      return $el;
    }

    // if is root
    if ($el === $ctx.$el) {
      this.createComponent($el, $ctx, null);
    } else {
      const instance = this.createComponent($el, $ctx, $ctx);
      $ctx.$components._instances.add(element.getId(instance.$el, true), instance);
      $ctx.$children = $ctx.$components._instances.values();

      const ref = instance.$el.attr('hi-ref');
      if (ref) {
        $ctx.$components.$refs[ref] = instance;
      }
    }

    return null;

    // child components


    /*
    const iterator = ($el, $ctx) => {
      if (!$el || !$el.length || !$el[0]) {
        return;
      }

      for (const childNode of Array.prototype.slice.call($el.children())) {
        if (this.isComponent($(childNode), $ctx)) {
          const instance = this.createComponent(childNode, $ctx);
          //instance.$parent = $ctx;
          $ctx.$components._instances.add(element.getId(instance.$el, true), instance);
          $ctx.$children = $ctx.$components._instances.values();

          const ref = instance.$el.attr('hi-ref');
          if (ref) {
            $ctx.$components.$refs[ref] = instance;
          }
        } else {
          iterator($(childNode), $ctx);
        }
      }
    };

    //if root is component
    if (this.isComponent($ctx.$el, $ctx)) {
      this.createComponent($ctx.$el, $ctx);
    }

    iterator($el, $ctx);
    */
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
  createComponent($el, $ctx, $parent) {
    const tagName = $el[0].tagName.toLowerCase();
    const View = $ctx.$components[tagName];
    const $new = $('<div></div>').html($el.html()).attr(assign({'hi-component': tagName}, getAttrs($el)));
    $el.replaceWith($new);
    const instance = new View({$el: $new, $parent});
    return instance;
  },
  remove($el, $ctx) {
    if (!component.isComponent($el, $ctx)) {
      return;
    }

    const id = element.getId($el);
    if (id != null) {
      $ctx.$components._instances.find(id).forEach(function (instance) {
        instance.$destroy();

        const ref = instance.$el.attr('hi-ref');
        if (ref) {
          delete $ctx.$components.$refs[ref];
        }
      });
      $ctx.$components._instances.remove(id);
      $ctx.$children = $ctx.$components._instances.values();
    }

    /*
    const iterator = function ($el, $ctx) {
      if (component.isComponent($el, $ctx)) {
        const id = element.getId($el);
        if (id != null) {
          $ctx.$components._instances.find(id).forEach(function (instance) {
            instance.$destroy();

            const ref = instance.$el.attr('hi-ref');
            if (ref) {
              delete $ctx.$components.$refs[ref];
            }
          });
          $ctx.$components._instances.remove(id);
          $ctx.$children = $ctx.$components._instances.values();
        }

        return;
      }

      for (const childNode of Array.from($el.children())) {
        iterator($(childNode), $ctx);
      }
    };

    iterator($el, $ctx);
    */
  },
  destroy($ctx) {
    $ctx.$components._instances.values().forEach(function (instance) {
      instance.$destroy();
    });

    $ctx.$children = null;
  }
});

export default component;
