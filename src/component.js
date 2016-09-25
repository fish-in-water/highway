const components = {};

const component = function (name, View) {
  components[name.toLowerCase()] = View;
};

Object.assign(component, {
  compile($ctx) {
    $ctx.$el = $ctx.$el || $('<div></div>');
    $ctx.$template && $ctx.$el.html($($ctx.$template));
    $ctx.$components = Object.assign({}, components, $ctx.$components);
    const iterator = function (node, $ctx) {
      if (node == null) {
        return;
      }

      $ctx.$el.$children = $ctx.$el.$children || [];
      $ctx.$children = $ctx.$children || [];

      for (const childNode of Array.from(node.childNodes)) {
        if (childNode &&
          childNode.nodeType === 1 &&
          $ctx.$components[childNode.tagName.toLowerCase()]) {
          const View = $ctx.$components[childNode.tagName.toLowerCase()];
          const instance = new View;
          $(childNode).replaceWith(instance.$el);
          $ctx.$children.push(instance);
        } else {
          $ctx.$el.$children.push($(childNode));
          iterator(childNode, $ctx);
        }
      }
    }

    iterator($ctx.$el[0], $ctx);
  },
  destroy($ctx) {
    $ctx.$el.$children = null;
    $ctx.$children = null;

    console.log('component destroy')

  }
});

export default component;
