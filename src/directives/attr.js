import directive from '../directive';
import {secureHtml, deconstruct} from '../utils';

const attr = function ({$el, $exp, $arg, $scope, $ctx}) { //$ctx, $el, $arg, $exp
  return directive.pattern($exp, $scope, $ctx, function ({newVal, secure}) {
    newVal = secure ? secureHtml(newVal) : newVal;
    if (!(newVal === 'false' || !newVal)) {
      $el.attr($arg, newVal);
    } else {
      $el.removeAttr($arg);
    }
  });
};

export default attr;
