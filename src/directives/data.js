import directive from '../directive';
import {secureHtml, deconstruct} from '../utils';

/**
 * data指令
 * @param param0 
 */
const data = ({$el, $exp, $arg, $scope, $ctx}) => { //$ctx, $el, $arg, $exp
  return directive.pattern($exp, $scope, $ctx, ({newVal, secure}) => {
    newVal = secure ? secureHtml(newVal) : newVal;
    $el.attr('data-' + $arg, newVal);
  });
};

export default data;
