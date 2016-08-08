import element from './utils/element'

const directives = {};

const directive = function (directive, handler) {
  directives[directive] = handler;
};

Object.assign(directive, {
  directives,
  compile(node) {
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
  }
});

export default directive;

