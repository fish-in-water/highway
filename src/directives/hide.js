import directive from '../directive';
import {secureHtml, isTrue} from '../utils';

const hide = function ({$el, $exp, $scope, $ctx}) { //$ctx, $el, $arg, $exp
  return directive.pattern($exp, $scope, $ctx, function ({newVal, secure}) {
    newVal = secure ? secureHtml(newVal) : newVal;
    if (!isTrue(newVal)) {
      $el.css('display', '');
    } else {
      $el.css('display', 'none');
    }
  });
};

export default hide;
