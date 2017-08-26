import directive from '../directive';
import {secureHtml, isTrue} from '../utils';

const show = ({$el, $exp, $scope, $ctx}) => { //$ctx, $el, $arg, $exp
  return directive.pattern($exp, $scope, $ctx, ({newVal, secure}) => {
    newVal = secure ? secureHtml(newVal) : newVal;
    if (isTrue(newVal)) {
      $el.css('display', '');
    } else {
      $el.css('display', 'none');
    }
  });
};

export default show;
