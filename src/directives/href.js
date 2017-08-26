import directive from '../directive';
import {secureUri} from '../utils';

/**
 * href指令
 * @param param0 
 */
const href = ({$el, $exp, $scope, $ctx}) => { //$ctx, $el, $arg, $exp
  return directive.pattern($exp, $scope, $ctx, ({newVal, secure}) => {
    $el.attr('href', secure ? secureUri(newVal, ['&']) : newVal);
  });
};

export default href;
