import {deconstruction, secureHtml} from '../../../utils/grocery'

const text = function ($el, $ctx, $arg, $exp) {
  const {prop, secure, watch} = deconstruction($exp);
  const handler = function ($new) {
    $el.val(secure ? secureHtml($new) : $new);
  };
  if (watch) {
    $ctx.$scope.watch(prop, handler);
    $el.on('input', function () {
      $ctx.$scope.set(prop, $el.val());
    });
  }
  handler($ctx.$scope.get(prop));
};

export default text;



