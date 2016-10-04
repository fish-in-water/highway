const macros = {};

const macro = function (exp, macro) {
  macros[exp] = macro;
};

Object.assign(macro, {
  compile($el, $ctx) {
    // if is root
    if ($el === $ctx.$el) {
      $ctx.$macros = Object.assign({}, macros, $ctx.macros);
      $ctx.$macros._instances = [];
    }

    const iterator = function ($el, $ctx) {
      for (const $child of $el.$children || []) {
        iterator($child, $ctx);
      }

      if ($el[0].nodeType === 3) {
        const text = $el.text();
        if (text == null || text === '') {
          return;
        }

        const instances = [];
        const $parent = $el.parent();
        const update = function () {
          if (instances && instances.length) {
            const newHtml = instances.reduce(function (text, instance) {
              return instance.$replace ? instance.$replace(text) : text;
            }, text);
            $parent.html(newHtml);
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
    };

    iterator($el, $ctx);
  },
  destroy($ctx) {
    console.log('macros destroy');
  }
});

export default macro;
