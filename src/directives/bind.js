import directive from '../directive';
import {secureHtml, isObject, isEqual, deconstruct} from '../utils';

/**
 * bind指令
 * @param param0 
 */
const bind = ({$el, $exp, $scope, $ctx}) => { //$ctx, $el, $arg, $exp
  return directive.pattern($exp, $scope, $ctx, ({newVal, secure}) => {
    newVal = secure ? secureHtml(newVal) : newVal;
    newVal = isObject(newVal) ? newVal.toString() : newVal;
    $el.html(newVal);
  });
};

export default bind;
