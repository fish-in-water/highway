import directive from '../directive';
import {secureHtml, isTrue} from '../utils';

const disable = function ({$el, $exp, $scope, $ctx}) { //$ctx, $el, $arg, $exp
  return directive.pattern($exp, $scope, $ctx, function ({newVal, secure}) {
    newVal = secure ? secureHtml(newVal) : newVal;
    if (isTrue(newVal)) {
      $el.attr('disabled', true);
    } else {
      $el.removeAttr('disabled');
    }
  });
};

export default disable;
