import directive from '../directive';
import {secureHtml} from '../utils';

const disable = function ({$el, $exp, $scope, $ctx}) { //$ctx, $el, $arg, $exp
  return directive.pattern($exp, $scope, $ctx, function ({newVal, secure}) {
    newVal = secure ? secureHtml(newVal) : newVal;
    if (!(newVal === 'false' || !newVal)) {
      $el.attr('disabled', true);
    } else {
      $el.removeAttr('disabled');
    }
  });
};

export default disable;
