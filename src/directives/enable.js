import directive from '../directive';
import {secureHtml} from '../utils';

const enable = function ({$el, $exp, $scope, $ctx}) { //$ctx, $el, $arg, $exp
  return directive.pattern($exp, $scope, $ctx, function ({newVal, secure}) {
    newVal = secure ? secureHtml(newVal) : newVal;
    if (!(newVal === 'false' || !newVal)) {
      $el.removeAttr('disabled');
    } else {
      $el.attr('disabled', true);
    }
  });
};

export default enable;
