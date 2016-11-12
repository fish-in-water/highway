import directive from '../directive';
import {secureUrl} from '../utils';

const href = function ({$el, $exp, $scope, $ctx}) { //$ctx, $el, $arg, $exp
  return directive.pattern($exp, $scope, $ctx, function ({newVal, secure}) {
    $el.attr('href', secure ? secureUrl(newVal, ['&']) : newVal);
  });
};

export default href;
