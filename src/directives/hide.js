import directive from '../directive';
import {secureHtml, isTrue} from '../utils';

/**
 * hide指令
 * @param param0 
 */
const hide = ({$el, $exp, $scope, $ctx}) => { //$ctx, $el, $arg, $exp
  return directive.pattern($exp, $scope, $ctx, ({newVal, secure}) => {
    newVal = secure ? secureHtml(newVal) : newVal;
    if (!isTrue(newVal)) {
      $el.css('display', '');
    } else {
      $el.css('display', 'none');
    }
  });
};

export default hide;
