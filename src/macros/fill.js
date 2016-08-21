import {deconstruction, secureHtml} from '../utils/grocery'

const fill = function ($el, $ctx, $text, $exp) {
  const {prop, secure} = deconstruction($exp);
  return secure ? secureHtml($ctx.$scope.get(prop)) : $ctx.$scope.get(prop);
};

export default fill;
