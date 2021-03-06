import directive from '../directive';
import {secureUri} from '../utils';

/**
 * src指令
 * @param param0 
 */
const src = ({$el, $exp, $scope, $ctx}) => { //$ctx, $el, $arg, $exp
  return directive.pattern($exp, $scope, $ctx, ({newVal, secure}) => {
    $el.attr('src', secure ? secureUri(newVal) : newVal);
  });
};

export default src;
