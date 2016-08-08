const element = {
  getAttrs(node) {
    const attrs = {};
    for (const attr in node.attributes) {
      if (node.attributes.hasOwnProperty(attr)) {
        attrs[node.attributes[attr].name] = node.attributes[attr].value;
      }
    }
    return attrs;
  },
  isElement(node) {
    return node.nodeType === 1;
  },
  getTagName(node) {
    return this.isElement(node) ? node.tagName.toLowerCase() : '';
  }
};

export default element;
