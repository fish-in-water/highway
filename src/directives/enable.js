import directive from '../directive';
import {secureHtml, isTrue} from '../utils';

const enable = ({$el, $exp, $scope, $ctx}) => { //$ctx, $el, $arg, $exp
  return directive.pattern($exp, $scope, $ctx, ({newVal, secure}) => {
    newVal = secure ? secureHtml(newVal) : newVal;
    if (isTrue(newVal)) {
      $el.removeAttr('disabled');
    } else {
      $el.attr('disabled', true);
    }
  });
};

export default enable;
