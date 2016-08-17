const compiler = {
  compile(node, parent) {
    parent.$el.$children = parent.$el.$children || [];
    parent.$children = parent.$children || [];

    for (const childNode of Array.prototype.slice.call(node.childNodes)) {
      if (this.isComponent(childNode)) { // this is component
        const View = components[childNode.tagName.toLowerCase()];
        const instance = new View({$el: $(childNode)});
        parent.$children.push(instance);
        this.compile(childNode, instance);
      } else { // this is element
        if (element.isElement(childNode)) {
          parent.$el.$children.push($(childNode));
        }
        this.compile(childNode, parent);
      }
    }

    return parent;
  }
};

export default compiler;
