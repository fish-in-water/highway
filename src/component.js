import element from './utils/element'

const components = {};

const component = function (tag, View) {
  components[tag.toLowerCase()] = View;
};

Object.assign(component, {
  components,
  compile(node, parent) {
    parent.children = parent.children || [];

    for (const childNode of Array.prototype.slice.call(node.childNodes)) {
      if (this.isComponent(childNode)) {
        const View = components[childNode.tagName.toLowerCase()];
        const instance = new View({$el: $(childNode)});
        parent.children.push(instance);
        this.compile(childNode, instance);
      } else {
        this.compile(childNode, parent);
      }
    }

    return parent.children;
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
