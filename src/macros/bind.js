import {deconstruction, secureHtml} from '../utils/grocery';
import fill from './fill';

const bind = function ($el, $ctx, $text, $exp) {
  const {prop, secure} = deconstruction($exp);
  $ctx.$scope.watch(prop, function () {
    $el.html($text.replace(/{{{(\S+)}}}/, function ($0, $1) {
      return $ctx.$scope.get($1);
    }).replace(/{{(\S+)}}/, function ($0, $1) {
      return secureHtml($ctx.$scope.get($1));
    }));
  });
  return secure ? secureHtml($ctx.$scope.get(prop)) : $ctx.$scope.get(prop);
};

export default bind;
