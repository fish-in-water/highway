import {inject} from '../utils/grocery';
import directive from '../directive';

const on = directive.extend(function ($el, $ctx, $arg, $exp) {
  const matches = $exp.trim().match(/^([^\(]*)\s*\(\s*([^\)]*)\)/m);
  const method = matches[1];
  const args = matches[2].split(',').map(function (arg) {
    arg = arg.trim();
    if ((/^\$/).test(arg)) { //injection
      return arg;
    } if ((/^'[\s\S]*'$/).test(arg) || ((/^"[\s\S]*"$/).test(arg))) { //string
      return arg.substring(1, arg.length - 1);
    } else { //number
      return arg - 0;
    }
  });
  const obj = {};
  for (const arg of args) {
    obj[arg] = arg;
  }

  $el.on($arg, function ($ev) {
    inject($ctx[method].bind($ctx), Object.assign({
      $el,
      $ev
    }, obj))();
  });
});

export default on;

