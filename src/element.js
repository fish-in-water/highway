import component from './component';
import $ from 'Zepto';

//attach search method
$.fn.$search = function (selector) {
  return $([].concat(this.filter(selector)).concat(this.find(selector)));
}

const compile = function (node) {

  if (!node.$children) {
    node.$children = $();
    //$el.$children.search = function (selector) {
    //  return $([].concat(this.filter(selector)).concat(this.find(selector)));
    //}
  }

  for (const childNode of Array.prototype.slice.call(node.childNodes)) {
    if (!component.isComponent(childNode) && element.isElement(childNode)) {
      node.$children.push($(childNode));
      compile(childNode);
    }
  }

  return node.$children;
}

const element = {
  compile($ctx) {
    console.log($ctx.tag);
    return compile($ctx.$el[0]);
  },
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
