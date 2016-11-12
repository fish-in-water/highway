import element from './element';
import component from './component';
import service from './service';
import directive from './directive';
import macro from './macro';
import pipe from './pipe';

const compiler = {
  initial($ctx) {

    element.initial($ctx);

    pipe.initial($ctx);

    service.initial($ctx);

    directive.initial($ctx);

    component.initial($ctx);

    macro.initial($ctx);

    return this;
  },
  compile($el, $scope, $ctx) {

    const iterator = ($el, $scope, $ctx) => {
      if (!$el || !$el.length) {
        return;
      }

      if (component.isComponent($el, $ctx)) {
        component.compile($el, $scope, $ctx)
      } else {
        if ($el = directive.compile($el, $scope, $ctx)) {
          if ($el = macro.compile($el, $scope, $ctx)) {
            for (const childNode of Array.prototype.slice.call($el.children())) {
              iterator($(childNode), $scope, $ctx);
            }
          }
        }
      }
    };

    iterator($el, $scope, $ctx);

    return this;
  },
  remove($el, $ctx) {
    const iterator = ($el, $ctx) => {
      if (!$el || !$el.length) {
        return;
      }

      if (component.isComponent($el, $ctx)) {
        component.remove($el, $ctx);
      } else {
        for (const childNode of Array.prototype.slice.call($el.children())) {
          iterator($(childNode), $ctx);
        }

        macro.remove($el, $ctx);

        directive.remove($el, $ctx);

        element.remove($el, $ctx);
      }
    };

    iterator($el, $ctx);

    return this;
  },
  destroy($ctx) {

    macro.destroy($ctx);

    component.destroy($ctx);

    directive.destroy($ctx);

    service.destroy($ctx);

    pipe.destroy($ctx);

    element.destroy($ctx);

    return this;
  }
};

export default compiler;
