import {deconstruction, secureHtml} from '../utils/grocery';
import macro from '../macro';

const fill = macro.extend(function ($el, $ctx, $text, $exp) {
  const {prop, secure} = deconstruction($exp);
  return secure ? secureHtml($ctx.$scope.get(prop)) : $ctx.$scope.get(prop);
});

export default fill;
