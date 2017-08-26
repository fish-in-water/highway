import directive from '../directive';
import {secureHtml, deconstruct} from '../utils';

/**
 * css指令
 * @param param0 
 */
const css = ({$el, $exp, $arg, $scope, $ctx}) => { //$ctx, $el, $arg, $exp
  return directive.pattern($exp, $scope, $ctx, ({newVal, secure}) => {
    newVal = secure ? secureHtml(newVal) : newVal;
    $el.css($arg, newVal);
  });
};

export default css;
