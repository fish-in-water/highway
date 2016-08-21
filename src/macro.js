import {inject} from './utils/grocery'

const macros = {};

const macro = function (macro, handler) {
  macros[macro] = handler;
};

const compile = function (node, $ctx) {
  const children = node.$children || [];
  for (const child of Array.from(children)) {
    compile(child[0], $ctx);
  }

  if (macro.isText(node)) {
    let wholeText = node.wholeText;
    const $el = $(node).parent();
    for (const macro in macros) {
      const regexp = new RegExp(macro, 'mgi')///\[\[key]]/mgi //new RegExp(macro, 'mgi');
      if (regexp.test(wholeText)) {
        wholeText = wholeText.replace(regexp, function ($0) {
          return inject(macros[macro], {
            $el,
            $text: wholeText,
            $ctx,
            $exp: $0
          })();
        });
        $el.html(wholeText);
      }
    }

  }
};

Object.assign(macro, {
  macros,
  compile($ctx) {
    compile($ctx.$el[0], $ctx);
  },
  isText(node) {
    return node.nodeType === 3;
  },
  extend(handler) {
    return handler;
  }
});

export default macro;

