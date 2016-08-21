import element from './element'

const components = {};

const component = function (tag, View) {
  components[tag.toLowerCase()] = View;
};

const compile = function (node, $ctx) {
  $ctx.$children = $ctx.$children || [];

  for (const childNode of Array.from(node.childNodes)) {
    if (component.isComponent(childNode)) { // this is component
      const View = components[childNode.tagName.toLowerCase()];
      const instance = new View({$el: $(childNode)});
      $ctx.$children.push(instance);
      compile(childNode, instance);
    } else { // this is element
      compile(childNode, $ctx);
    }
  }

  return $ctx.$children;
};

Object.assign(component, {
  components,
  compile($ctx) {
    return compile($ctx.$el[0], $ctx);
  },
  isComponent(node) {
    return node && node.nodeType === 1 && components[node.tagName.toLowerCase()];
  },
  findEl(tag) {
    if (!tag) {
      return;
    }

    const iterator = function (node) {
      if (element.getTagName(node) === tag.toLowerCase()) {
        return node;
      }
      const childNodes = Array.prototype.slice.call(node.childNodes);
      for (const childNode of childNodes) {
        if (iterator(childNode)) {
          return childNode;
        }
      }
    };

    return iterator(document.body);
  },
  findTag(View) {
    if (!View) {
      return ;
    }

    for (const tag in components) {
      if (components[tag] === View) {
        return tag;
      }
    }
  }
});

export default component;
