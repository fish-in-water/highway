import directive from '../directive';
import {secureHtml, isTrue} from '../utils';

const readonly = ({$el, $exp, $scope, $ctx}) => { //$ctx, $el, $arg, $exp
  return directive.pattern($exp, $scope, $ctx, ({newVal, secure}) => {
    newVal = secure ? secureHtml(newVal) : newVal;
    if (isTrue(newVal)) {
      $el.attr('readonly', 'readonly');
    } else {
      $el.removeAttr('readonly');
    }
  });
};

export default readonly;
