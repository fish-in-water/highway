import component from './component';
import $ from 'Zepto';

//attach search method
$.fn.$search = function (selector) {
  return $([].concat(this.filter(selector)).concat(this.find(selector)));
}

const compile = function (node) {

  if (!node.$children) {
    node.$children = $();
  }

  for (const childNode of Array.from(node.childNodes)) {
    if (!component.isComponent(childNode)) {
      node.$children.push($(childNode));
      compile(childNode);
    }
  }

  return node.$children;
}

const element = {
  compile($ctx) {
    // el is empty
    if (!$ctx.$el) {
      $ctx.$el = $('<div></div>');
      const tag = component.findTag($ctx.constructor);
      const el = component.findEl(tag);
      if (tag && el) {
        $ctx.$el = $(el);
      }
    }

    // if is component
    if (component.isComponent($ctx.$el[0])) {
      const $old = $ctx.$el;
      const attrs = Object.assign({}, element.getAttrs($old[0]));
      attrs[$old[0].tagName.toLowerCase()] = '';
      const $new = $ctx.$el = $('<div></div>').attr(attrs);
      //const $new = this.$el = $('<div></div>').attr(
      //  Object.assign({'hi-component': $old[0].tagName.toLowerCase()}, element.getAttrs($old[0])));
      $old.replaceWith($new);

      $ctx.tag = $old[0].tagName.toLowerCase();
    }

    // html template
    if ($ctx.$template) {
      $ctx.$el.html($ctx.$template);
    }

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
