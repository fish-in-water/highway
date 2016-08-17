import element from './element'
import {inject} from './utils/grocery'

const directives = {};

const directive = function (directive, handler) {
  directives[directive] = handler;
};

const compile = function (node, $ctx) {
  const children = node.$children || [];
  for (const child of Array.prototype.slice.call(children)) {
    compile(child[0], $ctx);
  }

  const attrs = element.getAttrs(node);
  for (let attr in attrs) {
    if (directive.isDirective(attr)) {
      const index = attr.indexOf(':');
      const ori = attr;
      let arg = void 0;
      if (-1 != index) {
        attr = ori.substring(0, index);
        arg = ori.substring(index + 1);
      }

      inject(directives[attr], {
        $el: $(node),
        $ctx,
        $arg: arg,
        $exp: attrs[ori]
      })();
    }
  }
} ;

Object.assign(directive, {
  directives,
  compile($ctx) {
    //$el
    compile($ctx.$el[0], $ctx);

    //for (const childNode of Array.prototype.slice.call(node.childNodes)) {
    //  if (this.isComponent(childNode)) { //this is component
    //    const View = components[childNode.tagName.toLowerCase()];
    //    const instance = new View({$el: $(childNode)});
    //    parent.children.push(instance);
    //    this.compile(childNode, instance);
    //  } else { //this is element
    //    this.compile(childNode, parent);
    //  }
    //}
  },
  isDirective(attr) {
    const index = attr.indexOf(':');
    if (-1 != index) {
      attr = attr.substring(0, index);
    }

    return !!directives[attr];
  }
});

export default directive;

