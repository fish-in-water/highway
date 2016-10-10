import component from './component';
import element from './element';
import {unique, MapList} from './utils';

const macros = {};
const macro = function (exp, macro) {
  macros[exp] = macro;
};

Object.assign(macro, {
  initial($ctx) {
    $ctx.$macros = Object.assign({}, macros, $ctx.macros);
    $ctx.$macros._instances = new MapList;
  },
  compile($el, $scope, $ctx) {

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
                $update: update,
                $scope
              });
              instance.$mount && instance.$mount($ctx);
              instances.push(instance);
              $ctx.$macros._instances.add(element.getId($el, true), instance);
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
  remove($el, $ctx) {

    const iterator = function ($el, $ctx) {
      if (component.isComponent($el, $ctx)) {
        return;
      }

      for (const childNode of Array.from($el.children())) {
        iterator($(childNode), $ctx);
      }

      const id = element.getId($el);
      if (id != null) {
        const instances = $ctx.$macros._instances.find(id);
        for (const instance of instances) {
          instance.$unmount && instance.$unmount($ctx);
        }
        $ctx.$macros._instances.remove(id);
      }
    };

    iterator($el, $ctx);
  },
  destroy($ctx) {
    const keys = $ctx.$macros._instances.keys();
    for (const key in keys) {
      const instances = $ctx.$macros._instances.find(key);
      for (const instance of instances) {
        instance.$unmount && instance.$unmount($ctx);
      }
    }
    $ctx.$macros._instances.clear();
    $ctx.$macros._instances = null;
    $ctx.$macros = null;

  }
});

export default macro;
