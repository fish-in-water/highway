const macros = {};
import component from './component';

const macro = function (exp, macro) {
  macros[exp] = macro;
};

Object.assign(macro, {
  initial($ctx) {
    $ctx.$macros = Object.assign({}, macros, $ctx.macros);
    $ctx.$macros._instances = [];
  },
  compile($el, $ctx) {

    const iterator = function ($el, $ctx) {

      if (component.isComponent($el, $ctx)) {
        return;
      }

      if (!$el.children().length) {
        const text = $el.html();
        if (text == null || text === '') {
          return;
        }

        const instances = [];
        const update = function () {
          if (instances && instances.length) {
            const newHtml = instances.reduce(function (text, instance) {
              return instance.$replace ? instance.$replace(text) : text;
            }, text);
            $el.html(newHtml);
          }
        };

        for (const exp in macros) {
          const matches = text.match(new RegExp(exp, 'gm'));
          if (matches) {
            for (const match of matches) {
              const instance = macros[exp]({
                $ctx,
                $el,
                $exp: match,
                $update: update
              });
              instance.$mount && instance.$mount();
              instances.push(instance);
            }
          }
        }

        update();
      }

      for (const childNode of Array.from($el.children())) {
        iterator($(childNode), $ctx);
      }
    };

    iterator($el, $ctx);
  },
  destroy($ctx) {
    console.log('macros destroy');
  }
});

export default macro;
